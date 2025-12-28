export class HexagonalCellError {
  public static invalidCoordinatesErrorMessage = 'Invalid coordinates for this cell. Sum of (x,y,z) must be equal to 0';
  public static invalidCoordinatesError = new Error(HexagonalCellError.invalidCoordinatesErrorMessage);

  public static noItemErrorMessage = 'This cell has no item wrapped in it';
  public static noItemError = new Error(HexagonalCellError.noItemErrorMessage);
}
