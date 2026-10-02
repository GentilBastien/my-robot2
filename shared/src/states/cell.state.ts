import { Weight } from '../types/weight';
import { CellAttributeState } from './cell-attribute.state';

export interface CellState extends Weight {
  id: string;
  moveWeight: number;
  visionWeight: number;
  attributes: CellAttributeState;
}
