import { EffectInstance } from '@entities/effects/effect-instance';

export class EffectManager {
  public addEffect(effectInstance: EffectInstance): void {
    // this.AllEffects.push(effectInstance);
    effectInstance.effect.onApply(effectInstance);
  }

  public removeEffect(effectInstance: EffectInstance): void {
    // this.AllEffects.splice(this.AllEffects.indexOf(effectInstance), 1);
    effectInstance.effect.onExpire(effectInstance);
  }
}
