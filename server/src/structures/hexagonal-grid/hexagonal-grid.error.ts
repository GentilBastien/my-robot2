export class HexagonalGridError {
  public static outOfBoundsCoordinatesErrorMessage = 'Coordinates are off the grid';
  public static outOfBoundsCoordinatesError = new Error(HexagonalGridError.outOfBoundsCoordinatesErrorMessage);

  public static noCellFoundErrorMessage = 'No cell found at those coordinates';
  public static noCellFoundError = new Error(HexagonalGridError.noCellFoundErrorMessage);
}
