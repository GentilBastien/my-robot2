import { EventContext } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { ActionTypeEnum, EffectTypeEnum, ElementTypeEnum, MaybeArray, Reducer } from 'shared';
import { RobotCalculator } from '@calculators/robot.calculator';
import { HpRequestEvent } from '@events/hp/hp.request-event';
import { ShieldRequestEvent } from '@events/shield/shield.request-event';

export class DamageResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  actionTypeEnum: ActionTypeEnum | undefined;
  effectTypeEnum: EffectTypeEnum | undefined;
  targetRobotId: string;
  elementTypeEnum: ElementTypeEnum;
  damageDealt: number;
  isDodged: boolean;
  isCritical: boolean;
  defArmor: number;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    actionTypeEnum: ActionTypeEnum | undefined;
    effectTypeEnum: EffectTypeEnum | undefined;
    targetRobotId: string;
    elementTypeEnum: ElementTypeEnum;
    damageDealt: number;
    isDodged: boolean;
    isCritical: boolean;
    defArmor: number;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.actionTypeEnum = parameters.actionTypeEnum;
    this.effectTypeEnum = parameters.effectTypeEnum;
    this.targetRobotId = parameters.targetRobotId;
    this.elementTypeEnum = parameters.elementTypeEnum;
    this.damageDealt = parameters.damageDealt;
    this.isDodged = parameters.isDodged;
    this.isCritical = parameters.isCritical;
    this.defArmor = parameters.defArmor;
  }

  public mapToReducer(context: EventContext): MaybeArray<Reducer> {
    const shield = RobotCalculator.getRobotResourcesState(context, this.targetRobotId).shield;

    const damageToShield = Math.min(this.damageDealt, shield);
    const damageToHp = this.damageDealt - damageToShield;

    const shieldRequest = new ShieldRequestEvent(this.targetRobotId, -damageToShield);
    const hpRequest = new HpRequestEvent(this.targetRobotId, -damageToHp);

    context.pendingRequests.insertEnd([shieldRequest, hpRequest]);

    //TODO: destroy robot if damage leads to 0 hp
    //POSSIBLE SOLUTION: HpRequestEvent takes the DamageResponse in parameter
    // const isDestroyed = newHpValue === 0;
    // if (isDestroyed) {
    //   context.pendingRequests.insertEnd(
    //     new RobotDestroyedRequestEvent(
    //       this.sourceRobotId,
    //       this.targetRobotId,
    //       this.actionTypeEnum,
    //       this.effectTypeEnum,
    //       `damage (${this.damageDealt})`
    //     )
    //   );
    // }
    return [];
  }
}
