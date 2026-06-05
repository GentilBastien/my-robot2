import { ResponseEvent } from '@events/response.event';
import { ContextEvent } from '@events/context.event';
import { EffectState, MaybeArray, Reducer } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { addEffectState, updateEffectState } from '@reducers/effect.reducer';

export class AddEffectResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  effectState: EffectState;

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const effect: Effect = context.gameCalculator.getEffect(this.effectState);

    const alreadyAffected: EffectState | undefined = context.gameCalculator.getEffectStateIfTargetAlreadyAffectedBy(
      context.gameState,
      this.effectState
    );

    const newEffectsFromApply: RequestEvent[] = effect.handle({
      trigger: EffectTrigger.ON_APPLY,
      effectState: alreadyAffected ?? this.effectState,
      gameState: context.gameState,
      gameCalculator: context.gameCalculator,
    });
    context.pendingRequests.insertEnd(newEffectsFromApply);

    if (alreadyAffected) {
      return updateEffectState(alreadyAffected);
    } else {
      return addEffectState(this.effectState);
    }
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; effectState: EffectState }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.effectState = parameters.effectState;
  }
}
