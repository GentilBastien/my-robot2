import { Coordinates } from 'shared';
import { AttributesState } from '@states/attributes.state';
import { StatisticsState } from '@states/statistics.state';
import { ResourcesState } from '@states/resources.state';

export interface RobotState {
  id: string;
  name: string;
  location: Coordinates;
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
