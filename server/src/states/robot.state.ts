import { Coordinates } from 'shared';
import { AttributesState } from '@states/attributes.state';
import { StatisticsState } from '@states/statistics.state';
import { ResourcesState } from '@states/resources.state';

export interface RobotState {
  id: string;
  name: string;
  coordinates: Coordinates;
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
