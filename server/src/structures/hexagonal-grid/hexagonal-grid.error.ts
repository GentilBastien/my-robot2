export class HexagonalGridError {
  public static noCellFoundErrorMessage = 'No cell found at those coordinates';
  public static noCellFoundError = new Error(HexagonalGridError.noCellFoundErrorMessage);
}
