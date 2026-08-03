import { Coordinate } from '../types/coordinate';

export interface EffectState {
  id: string;
  sourceRobotId: string;
  targetRobotId?: string;
  targetCoordinates?: Coordinate;
  effectId: string;
  stacks: number;
  lastedTurns: number;
  remainingTurns: number;
}
