import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, MovementTypeEnum, Reducer, StepPathCostCoordinate } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { MovementRequestEvent } from '@events/movement/movement.request-event';
import { EffectCalculator } from '@calculators/effect.calculator';
import { MovementCostRequestEvent } from '@events/movement-cost/movement-cost.request-event';

export class StepPathResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    movementType: MovementTypeEnum;
    stepPath: StepPathCostCoordinate;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.movementType = parameters.movementType;
    this.stepPath = parameters.stepPath;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const effectStatesFromCoordinates: EffectState[] = EffectCalculator.getEffectStatesAtCoordinates(
      context,
      this.stepPath.endCoordinates
    );

    const movementCostReq = new MovementCostRequestEvent(this.sourceRobotId, this.stepPath.cost);
    context.pendingRequests.insertEnd(movementCostReq);

    const requestMovementStateEvent = new MovementRequestEvent(this.sourceRobotId, this.stepPath.endCoordinates);
    context.pendingRequests.insertEnd(requestMovementStateEvent);

    const newPendingRequestStateEvents: RequestEvent[] = effectStatesFromCoordinates.flatMap(effectState => {
      const effect: Effect = EffectCalculator.getEffect(effectState);
      return effect.handle({
        trigger: EffectTrigger.ON_APPLY,
        effectState,
        coordinates: this.stepPath.endCoordinates,
        ...context,
      });
    });
    context.pendingRequests.insertEnd(newPendingRequestStateEvents);

    return [];
  }
}
