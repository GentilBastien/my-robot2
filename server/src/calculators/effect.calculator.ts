import { Coordinate, EffectState } from 'shared';
import { effectList } from '@entities/effects/effect-list/effect.list';
import { Effect } from '@entities/effects/effect';
import { RobotCalculator } from '@calculators/robot.calculator';
import { EventContext } from '@events/context.event';

export class EffectCalculator {
  public static getEffect(effectState: EffectState): Effect {
    return effectList[effectState.effectId];
  }

  public static getEffectStateById(context: EventContext, effectStateId: string): EffectState {
    const effectStateFound: EffectState | undefined = context.gameState.effects.find(eff => eff.id === effectStateId);
    if (effectStateFound) {
      return effectStateFound;
    }
    throw 'temp error';
  }

  public static getEffectStatesFromRobot(context: EventContext, robotId: string): EffectState[] {
    return context.gameState.effects.filter(effect => effect.sourceRobotId === robotId);
  }

  public static getEffectStatesFromRobotCell(context: EventContext, robotId: string): EffectState[] {
    const robotCoordinates = RobotCalculator.getRobotCoordinates(context, robotId);
    return EffectCalculator.getEffectStatesAtCoordinates(context, robotCoordinates);
  }

  public static getEffectStatesAtCoordinates(context: EventContext, coordinates: Coordinate): EffectState[] {
    return context.gameState.effects.filter(effectState => effectState.targetCoordinates === coordinates);
  }

  /**
   * Returns the (possible) previously equal affected EffectState;
   * TODO: The equal targets coordinates currently can't work. The method must take in parameter into account the
   * TODO: position of the robot and the radius of both effects.
   */
  public static getEffectStateIfTargetAlreadyAffectedBy(
    context: EventContext,
    newEffectState: EffectState
  ): EffectState | undefined {
    // const _unused = CellCalculator.getAffectedRobotsByRadius(context);

    return context.gameState.effects.find(
      effectState =>
        effectState.effectId === newEffectState.effectId &&
        (effectState.targetRobotId === newEffectState.targetRobotId ||
          effectState.targetCoordinates === newEffectState.targetCoordinates)
    );
  }
}
