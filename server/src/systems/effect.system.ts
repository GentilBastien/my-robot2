import { GameState } from '@states/game-state';
import { GameEvent, NextTurnGameEvent, TurnGameEvent } from '@events/game.events';
import { GameEventTypeEnum } from 'shared';
import { Robot } from '@entities/robot/robot';

export class EffectSystem {
  public handleGameEvent(state: GameState, event: GameEvent): GameEvent[] {
    switch (event.gameEventType) {
      case GameEventTypeEnum.TURN_START: {
        const turnGameEvent = event as TurnGameEvent;
        return this.onTurnStart(state, turnGameEvent.turnRobot);
      }
      case GameEventTypeEnum.TURN_END: {
        const turnGameEvent = event as TurnGameEvent;
        return this.onTurnEnd(state, turnGameEvent.turnRobot);
      }
      case GameEventTypeEnum.NEXT_TURN: {
        const nextTurnGameEvent = event as NextTurnGameEvent;
        return this.onNextTurn(state, nextTurnGameEvent.nextTurnRobot);
      }
      default:
        return [];
    }
  }

  private onTurnStart(state: GameState, robot: Robot): GameEvent[] {
    const statesFromRobotTurn: GameEvent[] = state.effectState.activeEffects
      .filter(effectInstance => effectInstance.source === robot)
      .flatMap(effectInstance => effectInstance.effect.onTurnStart(effectInstance));
    const statesFromEventsEachTurn: GameEvent[] = state.effectState.activeEffects
      .filter(effectInstance => effectInstance.source === robot)
      .flatMap(effectInstance => effectInstance.effect.onEveryTurnStart(effectInstance));
    return statesFromRobotTurn.concat(statesFromEventsEachTurn);
  }

  private onTurnEnd(state: GameState, robot: Robot): GameEvent[] {
    return [];
  }

  private onNextTurn(state: GameState, robot: Robot): GameEvent[] {
    return [];
  }
}
