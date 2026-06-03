import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionTypeEnum, DamageTypeEnum, Reducer } from 'shared';
import { RobotDestroyedRequestEvent } from '@events/robot-destroyed/robot-destroyed.request-event';
import { hpAndShieldReducer, hpReducer, shieldReducer } from '@reducers/resources.reducer';

export class DamageResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  actionTypeEnum: ActionTypeEnum;
  targetRobotId: string;
  damageType: DamageTypeEnum;
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  armorEfficiency: number;

  public mapToReducer(context: ContextEvent): Reducer | null {
    const { hp, shield } = context.gameCalculator.getRobotResourcesState(context.gameState, this.targetRobotId);

    const damageToShield = Math.min(this.damageDealt, shield);
    const damageToHp = this.damageDealt - damageToShield;

    const newShield = shield - damageToShield;
    const newHp = Math.max(hp - damageToHp, 0);

    const isDestroyed = newHp === 0;
    if (isDestroyed) {
      context.pendingRequests.insertEnd(
        new RobotDestroyedRequestEvent(
          this.sourceRobotId,
          this.targetRobotId,
          this.actionTypeEnum,
          `damage (${this.damageDealt})`
        )
      );
    }

    if (newShield === shield) return hpReducer(this.targetRobotId, newHp);
    if (newHp === hp) return shieldReducer(this.targetRobotId, newShield);
    return hpAndShieldReducer(this.targetRobotId, newHp);
  }

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    actionTypeEnum: ActionTypeEnum;
    targetRobotId: string;
    damageType: DamageTypeEnum;
    damageDealt: number;
    isDodged: boolean;
    isCritical: boolean;
    armorEfficiency: number;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.actionTypeEnum = parameters.actionTypeEnum;
    this.targetRobotId = parameters.targetRobotId;
    this.damageType = parameters.damageType;
    this.damageDealt = parameters.damageDealt;
    this.isDodged = parameters.isDodged;
    this.isCritical = parameters.isCritical;
    this.armorEfficiency = parameters.armorEfficiency;
  }
}
