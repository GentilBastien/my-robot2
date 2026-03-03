import { Effect, EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectCategoryTypeEnum } from 'shared';
import { EffectContext } from '@entities/effects/effect-context';
import { RequestStateEvent } from '@events/request-state.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export abstract class AbstractEffect implements Effect {
  protected _id = '';
  protected _type: EffectCategoryTypeEnum = EffectCategoryTypeEnum.INVISIBLE;
  protected _ticking: EffectTickingConfig = {
    totalTurns: 0,
    everyTurn: false,
    atApply: false,
  };
  protected _stacking: EffectStackingConfig = {
    enabled: false,
    maxStacks: 0,
    refreshDuration: false,
  };

  protected _handleOnApply = (effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action } = effectContext;
    return [];
  };

  protected _handleOnAction = (effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action } = effectContext;
    return [];
  };

  protected _handleOnTurnStart = (effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action } = effectContext;
    return [];
  };

  protected _handleOnTurnEnd = (effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action } = effectContext;
    return [];
  };

  protected _handleOnExpire = (effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action } = effectContext;
    return [];
  };

  public handle(context: EffectContext): RequestStateEvent[] {
    switch (context.trigger) {
      case EffectTrigger.ON_APPLY:
        return this._handleOnApply(context);
      case EffectTrigger.ON_ACTION:
        return this._handleOnAction(context);
      case EffectTrigger.ON_TURN_START:
        return this._handleOnTurnStart(context);
      case EffectTrigger.ON_TURN_END:
        return this._handleOnTurnEnd(context);
      case EffectTrigger.ON_EXPIRE:
        return this._handleOnExpire(context);
      default:
        return [];
    }
  }

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
}
