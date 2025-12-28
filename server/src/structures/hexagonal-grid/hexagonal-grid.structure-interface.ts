import { HexagonalCellStructure } from '../hexagonal-cell/hexagonal-cell.structure';

export interface HexagonalGridStructureInterface<T> {
  width: number;
  height: number;
  cells: HexagonalCellStructure<T>[];
}
