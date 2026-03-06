import { ResourcesState } from './resources.state';
import { AttributesState } from './attributes.state';
import { StatisticsState } from './statistics.state';
import { RobotStateTypeEnum } from '../enums/robot-state-type.enum';

export interface RobotState {
  id: string;
  name: string;
  cellId: string;
  selfStates: RobotStateTypeEnum[];
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
