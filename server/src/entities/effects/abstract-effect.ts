import { Effect, EffectStackingConfig, EffectTickingConfig } from '@entities/effects/effect';
import { EffectCategoryTypeEnum, GameEventTypeEnum } from 'shared';
import { EffectContext } from '@entities/effects/effect-context';
import {
  RequestAddEffectStateEvent,
  RequestRemoveEffectStateEvent,
  RequestStateEvent,
} from '@events/request-state.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';

export abstract class AbstractEffect implements Effect {
  private readonly _id: string;
  private readonly _type: EffectCategoryTypeEnum;
  private readonly _ticking: EffectTickingConfig;
  private readonly _stacking: EffectStackingConfig;

  protected constructor(
    id: string,
    type: EffectCategoryTypeEnum,
    ticking: EffectTickingConfig,
    stacking: EffectStackingConfig
  ) {
    this._id = id;
    this._type = type;
    this._ticking = ticking;
    this._stacking = stacking;
  }

  protected _handleOnApply = (_effectContext: EffectContext): RequestStateEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnSurface = (_effectContext: EffectContext): RequestStateEvent[] => {
    const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    const addEffect: RequestAddEffectStateEvent = {
      sourceRobotId: effectState.sourceRobotId,
      gameEventType: GameEventTypeEnum.ADD_EFFECT,
      actionTypeEnum: undefined,
      priority: 0,
      effectState: {
        sourceRobotId: effectState.sourceRobotId,
        id: '',
        stacks: 0,
        targetCoordinates: coordinates,
        effectId: effectState.id,
        remainingTurns: 10,
        lastedTurns: 0,
      },
    };
    return [addEffect];
  };

  protected _handleOnAction = (_effectContext: EffectContext): RequestStateEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnTurnStart = (_effectContext: EffectContext): RequestStateEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnTurnEnd = (_effectContext: EffectContext): RequestStateEvent[] => {
    // const { trigger, effectState, readonlyGameState, gameCalculator, action, coordinates } = _effectContext;
    return [];
  };

  protected _handleOnExpire = (effectContext: EffectContext): RequestStateEvent[] => {
    const effectState = effectContext.effectState;
    const requestRemoveEffectStateEvent: RequestRemoveEffectStateEvent = {
      gameEventType: GameEventTypeEnum.REMOVE_EFFECT,
      effectStateId: effectState.id,
      sourceRobotId: effectState.sourceRobotId,
    };
    return [requestRemoveEffectStateEvent];
  };

  public handle(context: EffectContext): RequestStateEvent[] {
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
