export class CyclicListError {
  public static nextOnEmptyListErrorMessage = 'Could not use next on empty CycleList';
  public static nextOnEmptyListError = new Error(CyclicListError.nextOnEmptyListErrorMessage);
}
