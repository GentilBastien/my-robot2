import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { Coordinates, MaybeArray, Reducer } from 'shared';
import { updateCoordinates } from '@reducers/robot.reducer';
import { updateCellState } from '@reducers/cell.reducer';

export class MovementResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  coordinates: Coordinates;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean; coordinates: Coordinates }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.coordinates = parameters.coordinates;
  }

  public mapToReducer(_context: ContextEvent): MaybeArray<Reducer> {
    const updateCoordinatesReducer: Reducer = updateCoordinates(this.sourceRobotId, this.coordinates);
    const newVisibleCells: Set<string> = _context.gameCalculator.getVisibleCells(
      _context.gameState,
      this.sourceRobotId
    );
    const updateCellsReducer: Reducer = updateCellState(this.sourceRobotId, newVisibleCells);

    return [updateCoordinatesReducer, updateCellsReducer];
  }
}
