import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionData, EffectState, MaybeArray, Reducer } from 'shared';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';
import { Action } from '@entities/actions/action';
import { ActionContext } from '@entities/actions/action.context';
import { RequestEvent } from '@events/request.event';
import { EffectCalculator } from '@calculators/effect.calculator';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { EffectContext } from '@entities/effects/effect-context';

export class ActionResponseEvent implements ResponseEvent {
  actionData: ActionData;
  action: Action;
  responseValidated: boolean;
  actionResponseErrors: ActionResponseErrors;

  constructor(
    actionData: ActionData,
    action: Action,
    responseValidated: boolean,
    actionResponseErrors: ActionResponseErrors
  ) {
    this.actionData = actionData;
    this.action = action;
    this.responseValidated = responseValidated;
    this.actionResponseErrors = actionResponseErrors;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const actionContext: ActionContext = {
      actionData: this.actionData,
      ...context,
    };
    const resourcesRequests: RequestEvent[] = this.action.requestResourcesForAction(actionContext);
    const onUseRequests: RequestEvent[] = this.action.onUse(actionContext);

    const actionSourceRobotId = this.actionData.sourceRobotId;
    const actionTargetRobotId = this.actionData.targetRobotId;
    const actionTargetCellCoordinate = this.actionData.targetCellCoordinate;

    const effectsSource: EffectState[] = EffectCalculator.getEffectStatesFromRobot(context, actionSourceRobotId);
    const effectsTarget: EffectState[] = actionTargetRobotId
      ? EffectCalculator.getEffectStatesFromRobot(context, actionTargetRobotId)
      : [];
    const effectsTargetCell: EffectState[] = actionTargetCellCoordinate
      ? EffectCalculator.getEffectStatesAtCoordinates(context, actionTargetCellCoordinate)
      : [];

    const effectsOnAction: RequestEvent[] = effectsSource
      .concat(effectsTarget)
      .concat(effectsTargetCell)
      .flatMap(effectState => {
        const effect: Effect = EffectCalculator.getEffect(effectState);
        const effectContext: EffectContext = {
          trigger: EffectTrigger.ON_ACTION,
          effectState,
          actionData: this.actionData,
          ...context,
        };
        return effect.handle(effectContext);
      });

    context.pendingRequests.insertEnd(resourcesRequests);
    context.pendingRequests.insertEnd(onUseRequests);
    context.pendingRequests.insertEnd(effectsOnAction);

    return [];
  }
}
