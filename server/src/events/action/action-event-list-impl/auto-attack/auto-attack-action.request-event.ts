import { AbstractActionRequestEvent } from '@events/action/action-event-list-impl/abstract-action.request-event';
import { ContextEvent } from '@events/context.event';
import { AutoAttackActionResponseEvent } from '@events/action/action-event-list-impl/auto-attack/auto-attack-action.response-event';

export class AutoAttackActionRequestEvent extends AbstractActionRequestEvent implements AutoAttackActionRequestEvent {
  public mapToResponse(_context: ContextEvent): AutoAttackActionResponseEvent {
    return new AutoAttackActionResponseEvent({ sourceRobotId: '', responseValidated: true });
  }
}
