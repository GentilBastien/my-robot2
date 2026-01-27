import { GameState } from '@states/game-state';
import {
  AdvanceTurnGameEvent,
  GameEvent,
  RobotDestroyedGameEvent,
  RobotJoinedGameEvent,
  TurnGameEvent,
} from '@events/game.events';
import { Comparator, GameEventTypeEnum } from 'shared';
import { CyclicListStructure } from '@structures/cyclic-list/cyclic-list.structure';

type InitiativeRobot = {
  robotId: string;
  initiative: number;
};

export class TurnEventHandler {
  private readonly _robotCyclicOrder: CyclicListStructure<InitiativeRobot>;

  constructor() {
    const robotComparator: Comparator<InitiativeRobot> = {
      compare(robot1: InitiativeRobot, robot2: InitiativeRobot): number {
        return robot1.initiative - robot2.initiative;
      },
    };
    this._robotCyclicOrder = new CyclicListStructure<InitiativeRobot>(robotComparator);
  }

  public handleGameEvent(readonlyGameState: Readonly<GameState>, gameEvent: GameEvent): GameEvent | null {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.TURN_START:
        return this.startTurn(readonlyGameState);
      case GameEventTypeEnum.TURN_END:
        return this.endTurn(readonlyGameState);
      case GameEventTypeEnum.ADVANCE_TURN:
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
      turnRobotId: robotToPlay.robotId,
    };
  }

  private endTurn(gameState: GameState): TurnGameEvent {
    const robotToPlay = gameState.turnState.currentTurnRobot;
    const currentTurnNumber = gameState.turnState.currentTurnNumber;
    return {
      gameEventType: GameEventTypeEnum.TURN_END,
      turnNumber: currentTurnNumber,
      turnRobotId: robotToPlay.robotId,
    };
  }

  private nextTurn(gameState: GameState): AdvanceTurnGameEvent {
    const nextRobotToPlay = this._robotCyclicOrder.next();
    const currentTurnNumber = gameState.turnState.currentTurnNumber;
    return {
      gameEventType: GameEventTypeEnum.ADVANCE_TURN,
      turnNumberAdvanced: currentTurnNumber + 1,
      turnRobotIdAdvanced: nextRobotToPlay.robotId,
    };
  }

  private robotJoined(gameEvent: RobotJoinedGameEvent): RobotJoinedGameEvent {
    const initiativeRobot: InitiativeRobot = {
      robotId: gameEvent.robot.robotId,
      initiative: 1,
    };
    this._robotCyclicOrder.insertItem(initiativeRobot);
    return gameEvent;
  }

  private robotDestroyed(gameEvent: RobotDestroyedGameEvent): RobotDestroyedGameEvent {
    const initiativeRobot: InitiativeRobot = {
      robotId: gameEvent.robot.robotId,
      initiative: 1,
    };
    this._robotCyclicOrder.removeItem(initiativeRobot);
    return gameEvent;
  }
}
