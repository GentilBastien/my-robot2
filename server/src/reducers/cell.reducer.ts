import { CellState, GameState, Reducer } from 'shared';

export const updateCellState =
  (robotId: string, visibleCellSet: Set<string>): Reducer =>
  (gameState: Readonly<GameState>): GameState => {
    const cells: CellState[] = gameState.arenaState.cells.map((cell: CellState) => {
      const visibleBy = cell.visibleBy.filter(id => id !== robotId);
      if (visibleCellSet.has(cell.id)) {
        visibleBy.push(robotId);
      }
      return { ...cell, visibleBy };
    });

    return {
      ...gameState,
      arenaState: {
        ...gameState.arenaState,
        cells,
      },
    };
  };
