import { GameState } from '@states/game.state';
import { ActionInstance } from '@entities/actions/action-instance';
import { RobotState } from '@states/robot.state';
import { Coordinates, DeepReadonly, PathCoordinate } from 'shared';

export interface GameCalculatorInterface {
  // -----------
  // VALIDATORS
  // -----------

  actionInRange(gameState: DeepReadonly<GameState>, actionInstance: ActionInstance): boolean;

  isRobotTurnToPlay(robotId: string): boolean;

  isValidMove(gameState: DeepReadonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): boolean;

  // -----------
  // GETTERS
  // -----------

  getRobotState(gameState: DeepReadonly<GameState>, robotId: string): RobotState;

  getRobotCoordinates(gameState: DeepReadonly<GameState>, robotId: string): Coordinates;

  getPossibleTargets(gameState: DeepReadonly<GameState>, robotId: string): PathCoordinate[];

  // -----------
  // EXECUTORS
  // -----------

  robotMoves(gameState: DeepReadonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): GameState;

  advanceTurn(gameState: DeepReadonly<GameState>): GameState;
}
