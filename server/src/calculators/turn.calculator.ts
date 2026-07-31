import { RobotState, TurnState, TurnStateTypeEnum } from 'shared';
import { ContextEvent } from '@events/context.event';
import { RobotCalculator } from '@calculators/robot.calculator';

export class TurnCalculator {
  public static getTurnState(context: ContextEvent): TurnState {
    return context.gameState.turnState;
  }

  public static getPlayingRobotId(context: ContextEvent): string {
    const robotPlaying = context.gameStateHandler.cyclicListState.currentItem;
    if (robotPlaying) {
      return robotPlaying.id;
    }
    throw 'Temp error';
  }

  public static getTurnNumber(context: ContextEvent): number {
    return TurnCalculator.getTurnState(context).currentTurnNumber;
  }

  public static getPlayingRobotState(context: ContextEvent): RobotState {
    return RobotCalculator.getRobotState(context, TurnCalculator.getPlayingRobotId(context));
  }

  public static newTurnState(context: ContextEvent): TurnState {
    const robotToPlay = context.gameStateHandler.cyclicListState.currentItem;
    if (robotToPlay) {
      return {
        turnStateTypeEnum: TurnStateTypeEnum.STARTED,
        currentTurnNumber: context.gameState.turnState.currentTurnNumber + 1,
        currentTurnRobotId: robotToPlay.id,
      };
    }
    throw new Error('Temp error');
  }

  public static advanceTurn(context: ContextEvent): RobotState {
    return context.gameStateHandler.cyclicListState.next();
  }
}
