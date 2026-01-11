import { PriorityListStructure } from '../structures/priority-list/priority-list.structure';
import { Updatable } from 'shared';
import { Effect } from '../temporal-states/effects/effect';

export class EffectManager implements Updatable {
  private readonly effects = new PriorityListStructure<Effect>({
    compare: (e1, e2) => e1.remainingTurns - e2.remainingTurns,
  });

  public update(): void {
    for (let i = this.effects.elements.length - 1; i >= 0; i--) {
      const effect: Effect = this.effects.elements[i];
      effect.update();
      if (effect.isStateConsumed()) {
        this.remove(effect);
      }
    }
  }

  public add(effect: Effect): void {
    this.effects.add(effect);
  }

  public remove(effect: Effect): void {
    this.effects.remove(effect);
  }
}
