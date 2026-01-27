import { Weight } from 'shared';

export interface TileState extends Weight {
  name: string;
  weight: number;
  robotId: string;
}
