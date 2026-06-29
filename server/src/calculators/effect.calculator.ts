import { Coordinates, EffectState, GameState } from 'shared';
import { effectList } from '@entities/effects/effect-list/effect.list';
import { Effect } from '@entities/effects/effect';
import { robotCalculator } from '@calculators/robot.calculator';

export const effectCalculator = {
  getEffect: getEffect,
  getEffectStateById: getEffectStateById,
  getEffectStatesFromRobot: getEffectStatesFromRobot,
  getEffectStatesFromRobotCell: getEffectStatesFromRobotCell,
  getEffectStatesAtCoordinates: getEffectStatesAtCoordinates,
  getEffectStateIfTargetAlreadyAffectedBy: getEffectStateIfTargetAlreadyAffectedBy,
};

function getEffect(effectState: EffectState): Effect {
  return effectList[effectState.effectId];
}

function getEffectStateById(gameState: Readonly<GameState>, effectStateId: string): EffectState {
  const effectStateFound: EffectState | undefined = gameState.effects.find(eff => eff.id === effectStateId);
  if (effectStateFound) {
    return effectStateFound;
  }
  throw 'temp error';
}

function getEffectStatesFromRobot(gameState: Readonly<GameState>, robotId: string): EffectState[] {
  return gameState.effects.filter(effect => effect.sourceRobotId === robotId);
}

function getEffectStatesFromRobotCell(gameState: Readonly<GameState>, robotId: string): EffectState[] {
  const robotCoordinates = robotCalculator.getRobotCoordinates(gameState, robotId);
  return getEffectStatesAtCoordinates(gameState, robotCoordinates);
}

function getEffectStatesAtCoordinates(gameState: Readonly<GameState>, coordinates: Coordinates): EffectState[] {
  return gameState.effects.filter(effectState => effectState.targetCoordinates === coordinates);
}

/**
 * Returns the (possible) previously equal affected EffectState;
 */
function getEffectStateIfTargetAlreadyAffectedBy(
  gameState: Readonly<GameState>,
  newEffectState: EffectState
): EffectState | undefined {
  return gameState.effects.find(
    effectState =>
      effectState.effectId === newEffectState.effectId &&
      (effectState.targetRobotId === newEffectState.targetRobotId ||
        effectState.targetCoordinates === newEffectState.targetCoordinates)
  );
}
