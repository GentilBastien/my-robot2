import { ResourcesState } from './resources.state';
import { AttributesState } from './attributes.state';
import { StatisticsState } from './statistics.state';

export interface RobotState {
  id: string;
  name: string;
  cellId: string;
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
