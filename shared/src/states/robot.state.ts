import { ResourcesState } from './resources.state';
import { AttributesState } from './attributes.state';
import { StatisticsState } from './statistics.state';
import { RobotStateTypeEnum } from '../enums/robot-state-type.enum';
import { Coordinates } from '../types/coordinates';

export interface RobotState {
  id: string;
  name: string;
  coordinates: Coordinates;
  selfStates: RobotStateTypeEnum[];
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
