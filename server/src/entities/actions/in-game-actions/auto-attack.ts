import { Action } from '../action';
import { ActionInstance } from '../action-instance';
import { FireAutoAttackGameEvent, GameEvent } from '../../../events/game-event';
import { DamageTypeEnum, GameEventTypeEnum } from 'shared';

export class AutoAttack implements Action {
  public range: number = 2;
  public baseAmount: number = 10;
  public manaCost: number = 0;
  public overheatingCost: number = 0;

  public onApply(actionInstance: ActionInstance): GameEvent[] {
    const autoAttackTargetedGameEvent: FireAutoAttackGameEvent = {
      gameEventType: GameEventTypeEnum.AUTO_ATTACK,
      source: actionInstance.source,
      target: actionInstance.target,
      baseDamage: this.baseAmount,
      damageType: DamageTypeEnum.ENERGETIC,
      totalTurns: 5,
      refreshDuration: true,
      fireDamage: 2,
    };
    return [autoAttackTargetedGameEvent];
  }

  public onTurnEnd(_: ActionInstance): GameEvent[] {
    return [];
  }
}
