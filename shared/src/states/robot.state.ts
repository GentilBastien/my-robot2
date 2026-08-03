import { ResourcesState } from './resources.state';
import { AttributesState } from './attributes.state';
import { StatisticsState } from './statistics.state';
import { RobotStateTypeEnum } from '../enums/robot-state-type.enum';
import { Coordinate } from '../types/coordinate';
import { MovementTypeEnum } from '../enums/movement-type.enum';

export interface RobotState {
  id: string;
  name: string;
  coordinates: Coordinate;
  selfStates: RobotStateTypeEnum[];
  movementType: MovementTypeEnum;
  vision: string[];
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
