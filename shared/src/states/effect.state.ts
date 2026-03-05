export interface EffectState {
  id: string;
  sourceRobotId: string;
  targetRobotId?: string;
  targetCellId?: string;
  effectId: string;
  stacks: number;
  lastedTurns: number;
  remainingTurns: number;
}
