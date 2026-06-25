import {
  AttributesState,
  AttributesTypeEnum,
  Coordinates,
  GameState,
  ResourcesState,
  RobotState,
  RobotStateTypeEnum,
  StatisticsState,
  StatisticsTypeEnum,
} from 'shared';

export function getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
  return gameState.robots[robotId];
}

export function getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
  return getRobotState(gameState, robotId).coordinates;
}

export function getRobotSelfStates(gameState: Readonly<GameState>, robotId: string): RobotStateTypeEnum[] {
  return gameState.robots[robotId].selfStates;
}

export function getRobotResourcesState(gameState: Readonly<GameState>, robotId: string): ResourcesState {
  return gameState.robots[robotId].resources;
}

function getRobotAttributeState(gameState: Readonly<GameState>, robotId: string): AttributesState {
  return gameState.robots[robotId].attributes;
}

export function getRobotStatisticState(gameState: Readonly<GameState>, robotId: string): StatisticsState {
  return gameState.robots[robotId].statistics;
}

export function getRobotAttributeValue(
  gameState: Readonly<GameState>,
  robotId: string,
  attributesTypeEnum: AttributesTypeEnum
): number {
  const attrState = getRobotAttributeState(gameState, robotId);
  switch (attributesTypeEnum) {
    case AttributesTypeEnum.POW:
      return attrState.power;
    case AttributesTypeEnum.MOB:
      return attrState.mobility;
    case AttributesTypeEnum.CHS:
      return attrState.chassis;
    case AttributesTypeEnum.CPU:
      return attrState.cpu;
    case AttributesTypeEnum.ENE:
      return attrState.energy;
    case AttributesTypeEnum.INTF:
      return attrState.interface;
  }
}

export function getRobotStatisticValue(
  gameState: Readonly<GameState>,
  robotId: string,
  statisticsTypeEnum: StatisticsTypeEnum
): number {
  const statState = getRobotStatisticState(gameState, robotId);
  switch (statisticsTypeEnum) {
    case StatisticsTypeEnum.HP:
      return statState.hp;
    case StatisticsTypeEnum.DAMAGE:
      return statState.damage;
    case StatisticsTypeEnum.ACCURACY:
      return statState.accuracy;
    case StatisticsTypeEnum.DODGE:
      return statState.dodge;
    case StatisticsTypeEnum.CRITICAL:
      return statState.critical;
    case StatisticsTypeEnum.REDUCTION:
      return statState.reduction;
    case StatisticsTypeEnum.ARMOR:
      return statState.armor;
    case StatisticsTypeEnum.MOVE_SPEED:
      return statState.moveSpeed;
  }
}

export function getRobotAttributeModifier(
  gameState: Readonly<GameState>,
  robotId: string,
  attributesTypeEnum: AttributesTypeEnum
): number {
  const value = getRobotAttributeValue(gameState, robotId, attributesTypeEnum);
  return Math.floor((value - 10) / 2);
}
