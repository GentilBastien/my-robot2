import { EventContext } from '@events/context.event';
import { RequestEvent } from '@events/request.event';
import { EffectState } from 'shared';
import { EffectAddResponseEvent } from '@events/effect-add/effect-add.response-event';

export class EffectAddRequestEvent implements RequestEvent {
  sourceRobotId: string;
  effectState: EffectState;

  constructor(sourceRobotId: string, effectState: EffectState) {
    this.sourceRobotId = sourceRobotId;
    this.effectState = effectState;
  }

  public mapToResponse(_context: EventContext): EffectAddResponseEvent {
    return new EffectAddResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      effectState: this.effectState,
    });
  }
}
