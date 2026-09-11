import { ResponseEvent } from '@events/response.event';
import { EventContext } from '@events/context.event';
import { EffectState, MaybeArray, Reducer } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { addEffectState, updateEffectState } from '@reducers/effect.reducer';
import { EffectCalculator } from '@calculators/effect.calculator';

export class EffectAddResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  effectState: EffectState;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; effectState: EffectState }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.effectState = parameters.effectState;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const effect: Effect = EffectCalculator.getEffect(this.effectState);

    const existingEffectState: EffectState | undefined = EffectCalculator.getEffectStateIfTargetAlreadyAffectedBy(
      context,
      this.effectState
    );

    const newEffectsFromApply: RequestEvent[] = effect.handle({
      trigger: EffectTrigger.ON_APPLY,
      effectState: existingEffectState ?? this.effectState,
      ...context,
    });
    context.pendingRequests.insertEnd(newEffectsFromApply);

    if (existingEffectState) {
      //TODO updateEffectState seems to do nothing ?
      return updateEffectState(existingEffectState);
    } else {
      return addEffectState(this.effectState);
    }
  }
}
