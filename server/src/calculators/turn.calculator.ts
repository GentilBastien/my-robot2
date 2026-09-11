import { RobotState, TurnState, TurnStateTypeEnum } from 'shared';
import { EventContext } from '@events/context.event';
import { RobotCalculator } from '@calculators/robot.calculator';

export class TurnCalculator {
  public static getTurnState(context: EventContext): TurnState {
    return context.gameState.turnState;
  }

  public static getPlayingRobotId(context: EventContext): string {
    const robotPlaying = context.gameStateHandler.cyclicListState.currentItem;
    if (robotPlaying) {
      return robotPlaying.id;
    }
    throw 'Temp error';
  }

  public static getTurnNumber(context: EventContext): number {
    return TurnCalculator.getTurnState(context).currentTurnNumber;
  }

  public static getPlayingRobotState(context: EventContext): RobotState {
    return RobotCalculator.getRobotState(context, TurnCalculator.getPlayingRobotId(context));
  }

  public static advanceTurn(context: EventContext): TurnState {
    const robotToPlay = context.gameStateHandler.cyclicListState.next();
    if (robotToPlay) {
      return {
        turnStateTypeEnum: TurnStateTypeEnum.STARTED,
        currentTurnNumber: context.gameState.turnState.currentTurnNumber + 1,
        currentTurnRobotId: robotToPlay.id,
      };
    }
    throw new Error('Temp error');
  }
}
