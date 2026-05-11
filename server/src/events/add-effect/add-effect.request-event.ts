import { ContextEvent } from '@events/context.event';
import { AddEffectResponseEvent } from '@events/add-effect/add-effect.response-event';
import { RequestEvent } from '@events/request.event';
import { EffectState } from 'shared';

export class AddEffectRequestEvent implements RequestEvent {
  sourceRobotId: string;
  effectState: EffectState;

  constructor(sourceRobotId: string, effectState: EffectState) {
    this.sourceRobotId = sourceRobotId;
    this.effectState = effectState;
  }

  public mapToResponse(_context: ContextEvent): AddEffectResponseEvent {
    return new AddEffectResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      effectState: this.effectState,
    });
  }
}
