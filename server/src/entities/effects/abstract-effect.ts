import { Effect, EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectCategoryTypeEnum } from 'shared';
import { EffectContext } from '@entities/effects/effect-context';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { RequestEvent } from '@events/request.event';

/**
 * Handler methods should not call each other.
 */
export abstract class AbstractEffect implements Effect {
  private readonly _type: EffectCategoryTypeEnum;
  private readonly _ticking: EffectTickingConfig;
  private readonly _stacking: EffectStackingConfig;

  protected constructor(type: EffectCategoryTypeEnum, ticking: EffectTickingConfig, stacking: EffectStackingConfig) {
    this._type = type;
    this._ticking = ticking;
    this._stacking = stacking;
  }

  protected _handleOnApply = (_effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnSurface = (_effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnAction = (_effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnTurnStart = (_effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnTurnEnd = (_effectContext: EffectContext): RequestEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnExpire = (_effectContext: EffectContext): RequestEvent[] => {
    // const effectState = effectContext.effectState;
    // const requestRemoveEffectStateEvent: RequestRemoveEffectStateEvent = {
    //   gameEventType: GameEventTypeEnum.REMOVE_EFFECT,
    //   effectStateId: effectState.id,
    //   sourceRobotId: effectState.sourceRobotId,
    // };
    // return [requestRemoveEffectStateEvent];
    return [];
  };

  public handle(context: EffectContext): RequestEvent[] {
    switch (context.trigger) {
      case EffectTrigger.ON_APPLY:
        return this._handleOnApply(context);
      case EffectTrigger.ON_SURFACE:
        return this._handleOnSurface(context);
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
