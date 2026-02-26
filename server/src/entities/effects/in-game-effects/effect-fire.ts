import { Effect, EffectStackingConfig, EffectTickingConfig } from '../effect';
import { EffectCategoryTypeEnum } from 'shared';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectContext } from '@entities/effects/effect-context';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export class EffectFire implements Effect {
  private _id = 'EffectFire';
  private _type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.NEGATIVE;

  private _ticking: EffectTickingConfig = {
    totalTurns: 5,
    everyTurn: true,
    atApply: true,
  };

  private _stacking: EffectStackingConfig = {
    enabled: true,
    maxStacks: 5,
    refreshDuration: true,
  };

  private _onApply = (_: EffectContext): RequestStateEvent[] => {
    return [];
  };

  private _onAction = (_: EffectContext): RequestStateEvent[] => {
    return [];
  };

  private _onTurnStart = (_: EffectContext): RequestStateEvent[] => {
    return [];
  };

  private _onTurnEnd = (_: EffectContext): RequestStateEvent[] => {
    return [];
  };

  private _onExpire = (_: EffectContext): RequestStateEvent[] => {
    return [];
  };

  public get id(): string {
    return this._id;
  }

  public get type(): EffectCategoryTypeEnum {
    return this._type;
  }

  public get ticking(): EffectTickingConfig {
    return this._ticking;
  }

  public get stacking(): EffectStackingConfig {
    return this._stacking;
  }

  public handle(context: EffectContext): RequestStateEvent[] {
    switch (context.trigger) {
      case EffectTrigger.ON_APPLY:
        return this._onApply(context);
      case EffectTrigger.ON_ACTION:
        return this._onAction(context);
      case EffectTrigger.ON_TURN_START:
        return this._onTurnStart(context);
      case EffectTrigger.ON_TURN_END:
        return this._onTurnEnd(context);
      case EffectTrigger.ON_EXPIRE:
        return this._onExpire(context);
      default:
        return [];
    }
  }
}
