import { GameState } from '@states/game-state';
import { GameEvent, RobotJoinedGameEvent } from '@events/game.events';
import { Coordinates, GameEventTypeEnum } from 'shared';

export class ArenaEventHandler {
  // private readonly grid: HexagonalGridStructure<TileState>;

  public handleGameEvent(readonlyGameState: Readonly<GameState>, gameEvent: GameEvent): GameEvent[] {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.ROBOT_JOINED:
        return this.robotJoined(readonlyGameState, gameEvent as RobotJoinedGameEvent);
      default:
        return [];
    }
  }

  private defineLocation(robotId: string): Coordinates {
    return { x: 0, y: 0, z: 0 };
  }

  private robotJoined(readonlyGameState: Readonly<GameState>, gameEvent: RobotJoinedGameEvent): GameEvent[] {
    const coordinates: Coordinates = this.defineLocation(gameEvent.robot.robotId);

    return [gameEvent];
  }
}
