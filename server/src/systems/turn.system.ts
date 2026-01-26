import { GameState } from '@states/game-state';
import {
  GameEvent,
  NextTurnGameEvent,
  RobotDestroyedGameEvent,
  RobotJoinedGameEvent,
  TurnGameEvent,
} from '@events/game.events';
import { Comparator, GameEventTypeEnum } from 'shared';
import { Robot } from '@entities/robot/robot';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';

export class TurnSystem {
  private readonly _robotCyclicOrder: CyclicListStructure<Robot>;

  constructor() {
    const robotComparator: Comparator<Robot> = {
      compare(item1: Robot, item2: Robot): number {
        return 0;
      },
    };
    this._robotCyclicOrder = new CyclicListStructure<Robot>(robotComparator);
  }

  public handleGameEvent(readonlyGameState: Readonly<GameState>, gameEvent: GameEvent): GameEvent | null {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START:
        return this.startTurn(readonlyGameState);
      case GameEventTypeEnum.TURN_END:
        return this.endTurn(readonlyGameState);
      case GameEventTypeEnum.NEXT_TURN:
        return this.nextTurn(readonlyGameState);
      case GameEventTypeEnum.ROBOT_DESTROYED:
        return this.robotDestroyed(gameEvent as RobotDestroyedGameEvent);
      case GameEventTypeEnum.ROBOT_JOINED:
        return this.robotJoined(gameEvent as RobotJoinedGameEvent);
      default:
        return null;
    }
  }

  private startTurn(gameState: GameState): TurnGameEvent {
    const robotToPlay = gameState.turnState.currentTurnRobot;
    const currentTurnNumber = gameState.turnState.currentTurnNumber;
    return {
      gameEventType: GameEventTypeEnum.TURN_START,
      turnNumber: currentTurnNumber,
      turnRobot: robotToPlay,
    };
  }

  private endTurn(gameState: GameState): TurnGameEvent {
    const robotToPlay = gameState.turnState.currentTurnRobot;
    const currentTurnNumber = gameState.turnState.currentTurnNumber;
    return {
      gameEventType: GameEventTypeEnum.TURN_END,
      turnNumber: currentTurnNumber,
      turnRobot: robotToPlay,
    };
  }

  private nextTurn(gameState: GameState): NextTurnGameEvent {
    const nextRobotToPlay = this._robotCyclicOrder.next();
    const currentTurnNumber = gameState.turnState.currentTurnNumber;
    return {
      gameEventType: GameEventTypeEnum.NEXT_TURN,
      nextTurnNumber: currentTurnNumber + 1,
      nextTurnRobot: nextRobotToPlay,
    };
  }

  private robotJoined(gameEvent: RobotJoinedGameEvent): RobotJoinedGameEvent {
    return {
      gameEventType: GameEventTypeEnum.ROBOT_JOINED,
      robot: gameEvent.robot,
    };
  }

  private robotDestroyed(gameEvent: RobotDestroyedGameEvent): RobotDestroyedGameEvent {
    return {
      gameEventType: GameEventTypeEnum.ROBOT_DESTROYED,
      robot: gameEvent.robot,
    };
  }
}
