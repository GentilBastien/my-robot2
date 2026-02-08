import { GameState } from '@states/game.state';
import { ActionInstance } from '@entities/actions/action-instance';
import { RobotState } from '@states/robot.state';
import { Coordinates, PathCoordinate } from 'shared';

export interface GameCalculatorInterface {
  // -----------
  // VALIDATORS
  // -----------

  actionInRange(gameState: Readonly<GameState>, actionInstance: ActionInstance): boolean;

  isRobotTurnToPlay(robotId: string): boolean;

  isValidMove(gameState: Readonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): boolean;

  // -----------
  // GETTERS
  // -----------

  getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState;

  getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates;

  getPossibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[];

  // -----------
  // EXECUTORS
  // -----------

  robotMoves(gameState: Readonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): GameState;

  advanceTurn(gameState: Readonly<GameState>): GameState;
}
