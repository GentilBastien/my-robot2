import { Coordinates, EffectState, GameState } from 'shared';
import { effectList } from '@entities/effects/effect-list/effect.list';
import { Effect } from '@entities/effects/effect';
import { getRobotCoordinates } from '@calculators/robot.calculator';

export function getEffect(effectState: EffectState): Effect {
  return effectList[effectState.effectId];
}

export function getEffectStateById(gameState: Readonly<GameState>, effectStateId: string): EffectState {
  const effectStateFound: EffectState | undefined = gameState.effects.find(eff => eff.id === effectStateId);
  if (effectStateFound) {
    return effectStateFound;
  }
  throw 'temp error';
}

export function getEffectStatesFromRobot(gameState: Readonly<GameState>, robotId: string): EffectState[] {
  return gameState.effects.filter(effect => effect.sourceRobotId === robotId);
}

export function getEffectStatesFromRobotCell(gameState: Readonly<GameState>, robotId: string): EffectState[] {
  const robotCoordinates = getRobotCoordinates(gameState, robotId);
  return getEffectStatesAtCoordinates(gameState, robotCoordinates);
}

export function getEffectStatesAtCoordinates(gameState: Readonly<GameState>, coordinates: Coordinates): EffectState[] {
  return gameState.effects.filter(effectState => effectState.targetCoordinates === coordinates);
}

/**
 * Returns the (possible) previously equal affected EffectState;
 */
export function getEffectStateIfTargetAlreadyAffectedBy(
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
