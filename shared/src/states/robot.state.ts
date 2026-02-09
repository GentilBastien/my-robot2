import { Coordinates } from '../types/coordinates';
import { ResourcesState } from './resources.state';
import { AttributesState } from './attributes.state';
import { StatisticsState } from './statistics.state';

export interface RobotState {
  id: string;
  name: string;
  coordinates: Coordinates;
  resources: ResourcesState;
  attributes: AttributesState;
  statistics: StatisticsState;
}
