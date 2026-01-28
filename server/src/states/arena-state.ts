import { TileState } from '@states/tile-state';

export interface ArenaState {
  tiles: TileState[];
  robotPositions: Map<string, string>;
}
