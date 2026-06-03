import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, Reducer } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { removeEffectState } from '@reducers/effect.reducer';

export class RemoveEffectResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  effectStateId: string;

  public mapToReducer(context: ContextEvent): Reducer | null {
    const effectState: EffectState = context.gameCalculator.getEffectStateById(context.gameState, this.effectStateId);
    const effect: Effect = context.gameCalculator.getEffect(effectState);

    const newEffectsWhenExpired: RequestEvent[] = effect.handle({
      trigger: EffectTrigger.ON_EXPIRE,
      effectState,
      gameState: context.gameState,
      gameCalculator: context.gameCalculator,
    });
    context.pendingRequests.insertEnd(newEffectsWhenExpired);

    return removeEffectState(this.effectStateId);
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; effectStateId: string }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.effectStateId = parameters.effectStateId;
  }
}
