import { ActionTypeEnum } from '../../enums/action-type.enum';
import { Coordinate } from '../../types/coordinate';

export interface ActionData {
  actionTypeEnum: ActionTypeEnum;
  sourceRobotId: string;
  hasEnergyModule: boolean;
  targetRobotId?: string;
  targetCellCoordinate?: Coordinate;
}
