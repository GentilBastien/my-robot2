export class EffectRobotManager {
  // private readonly effects = new PriorityListStructure<Effect>({
  //   compare: (e1, e2) => e1.remainingTurns - e2.remainingTurns,
  // });
  //
  // public update(): void {
  //   for (let i = this.effects.elements.length - 1; i >= 0; i--) {
  //     const effect: Effect = this.effects.elements[i];
  //     effect.update();
  //
  //     if (effect.applyEveryTurn) {
  //       if (effect.isStackable && effect.stacks < effect.maxStacks) {
  //         effect.incrementStacks();
  //       }
  //     }
  //
  //     if (effect.isStateConsumed()) {
  //       this.remove(effect);
  //     }
  //   }
  // }
  //
  // public add(effect: Effect): void {
  //   effect.startEffect();
  //   this.effects.add(effect);
  //   if (effect.applyAtStart) {
  //     let actionsToHandle: ActionOutput[] = effect.applyEffect();
  //     this.actionsToHandle.next(actionsToHandle);
  //   }
  // }
  //
  // public remove(effect: Effect): void {
  //   effect.removeEffect();
  //   this.effects.remove(effect);
  // }
}
