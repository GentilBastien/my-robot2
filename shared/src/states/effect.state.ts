import { Coordinate } from '../types/coordinate';
import { EffectTypeEnum } from '../enums/effect-type.enum';

export interface EffectState {
  id: string;
  effectId: EffectTypeEnum;
  sourceRobotId: string;
  targetRobotId?: string;
  targetCoordinates?: Coordinate;
  radius?: number;
  stacks?: number;
  lastedTurns?: number;
  remainingTurns?: number;
}
