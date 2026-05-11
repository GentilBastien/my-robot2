import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Reducer } from 'shared';

export class ActionResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;

  public mapToReducer(_context: ContextEvent): Reducer | null {
    return a => a;
  }

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
  }
}
