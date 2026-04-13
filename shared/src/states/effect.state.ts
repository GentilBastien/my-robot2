import { Coordinates } from '../types/coordinates';

export interface EffectState {
  id: string;
  sourceRobotId: string;
  targetRobotId?: string;
  targetCoordinates?: Coordinates;
  effectId: string;
  stacks: number;
  lastedTurns: number;
  remainingTurns: number;
}
