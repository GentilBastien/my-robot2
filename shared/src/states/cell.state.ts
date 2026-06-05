import { Weight } from '../types/weight';
import { CellAttributeState } from './cell-attribute.state';

export interface CellState extends Weight {
  id: string;
  weight: number;
  attributes: CellAttributeState;
  visibleBy: string[];
}
