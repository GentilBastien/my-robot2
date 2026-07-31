import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';
import { EffectState, MaybeArray, Reducer } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { addEffectState, updateEffectState } from '@reducers/effect.reducer';
import { EffectCalculator } from '@calculators/effect.calculator';

export class AddEffectResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  effectState: EffectState;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; effectState: EffectState }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.effectState = parameters.effectState;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const effect: Effect = EffectCalculator.getEffect(this.effectState);

    const existingEffectState: EffectState | undefined = EffectCalculator.getEffectStateIfTargetAlreadyAffectedBy(
      context,
      this.effectState
    );

    const newEffectsFromApply: RequestEvent[] = effect.handle({
      trigger: EffectTrigger.ON_APPLY,
      effectState: existingEffectState ?? this.effectState,
      gameState: context.gameState,
      gameStateHandler: context.gameStateHandler,
    });
    context.pendingRequests.insertEnd(newEffectsFromApply);

    if (existingEffectState) {
      return updateEffectState(existingEffectState);
    } else {
      return addEffectState(this.effectState);
    }
  }
}
