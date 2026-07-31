import { Coordinates, EffectState } from 'shared';
import { effectList } from '@entities/effects/effect-list/effect.list';
import { Effect } from '@entities/effects/effect';
import { RobotCalculator } from '@calculators/robot.calculator';
import { ContextEvent } from '@events/context.event';

export class EffectCalculator {
  public static getEffect(effectState: EffectState): Effect {
    return effectList[effectState.effectId];
  }

  public static getEffectStateById(context: ContextEvent, effectStateId: string): EffectState {
    const effectStateFound: EffectState | undefined = context.gameState.effects.find(eff => eff.id === effectStateId);
    if (effectStateFound) {
      return effectStateFound;
    }
    throw 'temp error';
  }

  public static getEffectStatesFromRobot(context: ContextEvent, robotId: string): EffectState[] {
    return context.gameState.effects.filter(effect => effect.sourceRobotId === robotId);
  }

  public static getEffectStatesFromRobotCell(context: ContextEvent, robotId: string): EffectState[] {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    return EffectCalculator.getEffectStatesAtCoordinates(context, robotCoordinates);
  }

  public static getEffectStatesAtCoordinates(context: ContextEvent, coordinates: Coordinates): EffectState[] {
    return context.gameState.effects.filter(effectState => effectState.targetCoordinates === coordinates);
  }

  /**
   * Returns the (possible) previously equal affected EffectState;
   */
  public static getEffectStateIfTargetAlreadyAffectedBy(
    context: ContextEvent,
    newEffectState: EffectState
  ): EffectState | undefined {
    return context.gameState.effects.find(
      effectState =>
        effectState.effectId === newEffectState.effectId &&
        (effectState.targetRobotId === newEffectState.targetRobotId ||
          effectState.targetCoordinates === newEffectState.targetCoordinates)
    );
  }
}
