import { GameEventTypeEnum } from 'shared';
import { AddEffectRequestGameEvent, GameEvent } from '../events/game-event';

export class GameEventResolver {
  public manageEvent(gameEvent: GameEvent): void {
    switch (gameEvent.gameEventType) {
      case GameEventTypeEnum.ADD_EFFECT_REQUEST: {
        const addEffectGameEvent: AddEffectRequestGameEvent = gameEvent as AddEffectRequestGameEvent;

        //extract logic
        const effectInstance = addEffectGameEvent.effect;
        if (effectInstance.stacks < effectInstance.effect.stacking.maxStacks) {
          effectInstance.stacks += 1;
        }

        return;
      }
    }
  }
}
