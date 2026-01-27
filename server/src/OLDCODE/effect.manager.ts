import { EffectInstance } from '@entities/effects/effect-instance';

export class EffectManager {
  public addEffect(effectInstance: EffectInstance): void {
    effectInstance.effect.onApply(effectInstance);
  }

  public removeEffect(effectInstance: EffectInstance): void {
    effectInstance.effect.onExpire(effectInstance);
  }
}
