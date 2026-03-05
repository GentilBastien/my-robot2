import { RequestHeatStateEvent } from '@events/request-state.event';
import { GameEventTypeEnum } from 'shared';
import { HeatResponseStateEvent } from '@events/response-state.event';

export function heatRequestStateCase(requestHeatStateEvent: RequestHeatStateEvent): HeatResponseStateEvent {
  return {
    gameEventType: GameEventTypeEnum.HEAT,
    responseValidated: true,
    sourceRobotId: requestHeatStateEvent.sourceRobotId,
    value: requestHeatStateEvent.value,
  };
}
