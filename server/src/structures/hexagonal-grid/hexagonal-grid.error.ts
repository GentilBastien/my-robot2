export class HexagonalGridError {
  public static invalidItemSizeErrorMessage = 'There must be as many items as there are cells in the grid';
  public static invalidItemSizeError = new Error(HexagonalGridError.invalidItemSizeErrorMessage);

  public static outOfBoundsCoordinatesErrorMessage = 'Coordinates are off the grid';
  public static outOfBoundsCoordinatesError = new Error(HexagonalGridError.outOfBoundsCoordinatesErrorMessage);

  public static noCellFoundErrorMessage = 'No cell found at those coordinates';
  public static noCellFoundError = new Error(HexagonalGridError.noCellFoundErrorMessage);
}
