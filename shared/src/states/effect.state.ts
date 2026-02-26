export interface EffectState {
  id: string;
  sourceId: string;
  targetId: string;
  cellId: string;
  effectId: string;
  stacks: number;
  lastedTurns: number;
  remainingTurns: number;
}
