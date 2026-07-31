import {
  ActionTypeEnum,
  AttributesState,
  AttributesTypeEnum,
  Coordinates,
  MovementTypeEnum,
  ResourcesState,
  RobotState,
  RobotStateTypeEnum,
  StatisticsState,
  StatisticsTypeEnum,
} from 'shared';
import { ContextEvent } from '@events/context.event';
import { TurnCalculator } from '@calculators/turn.calculator';
import { Action } from '@entities/actions/action';
import { actionList } from '@entities/actions/action-list/action.list';
import { ActionResponseErrors } from '@entities/actions/action-responses/action-response-errors';

export class RobotCalculator {
  public static getRobotState(context: ContextEvent, robotId: string): RobotState {
    return context.gameState.robots[robotId];
  }

  public static getRobotCoordinates(context: ContextEvent, robotId: string): Coordinates {
    return RobotCalculator.getRobotState(context, robotId).coordinates;
  }

  public static getRobotSelfStates(context: ContextEvent, robotId: string): RobotStateTypeEnum[] {
    return context.gameState.robots[robotId].selfStates;
  }

  public static getRobotResourcesState(context: ContextEvent, robotId: string): ResourcesState {
    return context.gameState.robots[robotId].resources;
  }

  public static getRobotAttributeState(context: ContextEvent, robotId: string): AttributesState {
    return context.gameState.robots[robotId].attributes;
  }

  public static getRobotStatisticState(context: ContextEvent, robotId: string): StatisticsState {
    return context.gameState.robots[robotId].statistics;
  }

  public static getRobotAttributeValue(
    context: ContextEvent,
    robotId: string,
    attributesTypeEnum: AttributesTypeEnum
  ): number {
    const attrState = RobotCalculator.getRobotAttributeState(context, robotId);
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

  public static getRobotStatisticValue(
    context: ContextEvent,
    robotId: string,
    statisticsTypeEnum: StatisticsTypeEnum
  ): number {
    const statState = RobotCalculator.getRobotStatisticState(context, robotId);
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

  public static getRobotAttributeModifier(
    context: ContextEvent,
    robotId: string,
    attributesTypeEnum: AttributesTypeEnum
  ): number {
    const value = RobotCalculator.getRobotAttributeValue(context, robotId, attributesTypeEnum);
    return Math.floor((value - 10) / 2);
  }

  public static isRobotTurn(context: ContextEvent, robotId: string): boolean {
    const playingRobotId = TurnCalculator.getPlayingRobotId(context);
    return robotId === playingRobotId;
  }

  public static getAction(actionTypeEnum: ActionTypeEnum): Action {
    const actionFound: Action | undefined = actionList[actionTypeEnum];
    if (actionFound) {
      return actionFound;
    }
    throw 'Temp error';
  }

  public static hasEnoughMana(resourcesState: ResourcesState, action: Action): boolean {
    return resourcesState.mana >= (action.manaCost ?? 0);
  }

  public static hasEnoughActionResource(resourcesState: ResourcesState, action: Action): boolean {
    return (
      resourcesState.remainingActions >= (action.actionCost ?? 0) &&
      resourcesState.remainingSubActions >= (action.subActionCost ?? 0)
    );
  }

  public static robotAllowedForAction(context: ContextEvent, robotId: string, action: Action): ActionResponseErrors {
    const response: ActionResponseErrors = {};
    const isRobotTurn = RobotCalculator.isRobotTurn(context, robotId);
    if (!isRobotTurn) {
      response.wrongTurn = { robotTurnId: TurnCalculator.getPlayingRobotId(context) };
    }
    const hasAction = true; //TODO hasAction in playbook
    if (!hasAction) {
      response.actionUnavailable = { conditions: ['Lvl 23 min', 'requires propulsors'] };
    }
    const resourcesState = RobotCalculator.getRobotResourcesState(context, robotId);
    const isRobotOverheating = resourcesState.isOverheating;
    if (isRobotOverheating) {
      response.robotOverheating = { overheating: resourcesState.overheating };
    }
    const robotHasEnoughAction = RobotCalculator.hasEnoughActionResource(resourcesState, action);
    if (!robotHasEnoughAction) {
      response.noEnoughAction = { cost: action.actionCost ?? 0, available: resourcesState.totalActions };
    }
    const robotHasEnoughMana = RobotCalculator.hasEnoughMana(resourcesState, action);
    if (!robotHasEnoughMana) {
      response.noEnoughMana = { cost: action.manaCost ?? 0, available: resourcesState.mana };
    }
    const robotHasEnoughRange = true; //TODO Range
    if (!robotHasEnoughRange) {
      response.noEnoughRange = { cost: action.range, available: 0 };
    }
    const robotHasVision = !action.needVision || (action.needVision && true); //TODO
    if (!robotHasVision) {
      response.noVision = { invisible: true };
    }
    return response;
  }

  public static movementTypeAllowedForRobot(
    context: ContextEvent,
    robotId: string,
    movementType: MovementTypeEnum
  ): boolean {
    //TODO: impl function
    // const robot = this.getRobotState(gameState, robotId);
    console.log(context, robotId, movementType);
    return true;
  }
}
