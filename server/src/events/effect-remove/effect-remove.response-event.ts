import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, Reducer } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { removeEffectState } from '@reducers/effect.reducer';
import { EffectCalculator } from '@calculators/effect.calculator';

export class EffectRemoveResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  effectStateId: string;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; effectStateId: string }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.effectStateId = parameters.effectStateId;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const effectState: EffectState = EffectCalculator.getEffectStateById(context, this.effectStateId);
    const effect: Effect = EffectCalculator.getEffect(effectState);

    const newEffectsWhenExpired: RequestEvent[] = effect.handle({
      trigger: EffectTrigger.ON_EXPIRE,
      effectState,
      ...context,
    });
    context.pendingRequests.insertEnd(newEffectsWhenExpired);

    return removeEffectState(this.effectStateId);
  }
}
