import { RequestEvent } from '@events/request.event';
import { EventContext } from '@events/context.event';
import { EffectRemoveResponseEvent } from '@events/system/effect-remove/effect-remove.response-event';

export class EffectRemoveRequestEvent implements RequestEvent {
  sourceRobotId: string;
  effectStateId: string;

  constructor(sourceRobotId: string, effectStateId: string) {
    this.sourceRobotId = sourceRobotId;
    this.effectStateId = effectStateId;
  }

  public resolve(_context: EventContext): EffectRemoveResponseEvent {
    return new EffectRemoveResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      effectStateId: this.effectStateId,
    });
  }
}
