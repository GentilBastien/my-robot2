import { MovementResponseStateEvent } from '@events/response-state.event';
import { Reducer } from 'shared';
import { updateCoordinates } from '@reducers/robot.reducer';

export function movementResponseStateCase(movementResponseStateEvent: MovementResponseStateEvent): Reducer {
  return updateCoordinates(movementResponseStateEvent.sourceRobotId, movementResponseStateEvent.coordinates);
}
