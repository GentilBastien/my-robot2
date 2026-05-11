import { RequestEvent } from '@events/request.event';
import { ContextEvent } from '@events/context.event';
import { RemoveEffectResponseEvent } from '@events/remove-effect/remove-effect.response-event';

export class RemoveEffectRequestEvent implements RequestEvent {
  sourceRobotId: string;
  effectStateId: string;

  constructor(sourceRobotId: string, effectStateId: string) {
    this.sourceRobotId = sourceRobotId;
    this.effectStateId = effectStateId;
  }

  public mapToResponse(_context: ContextEvent): RemoveEffectResponseEvent {
    return new RemoveEffectResponseEvent({
      sourceRobotId: this.sourceRobotId,
      responseValidated: true,
      effectStateId: this.effectStateId,
    });
  }
}
