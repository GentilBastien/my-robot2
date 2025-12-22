export class CyclicListError {
  public static nextOnEmptyListErrorMessage = 'Could not use next on empty CycleList';
  public static nextOnEmptyListError = new Error(CyclicListError.nextOnEmptyListErrorMessage);

  public static removeNotFoundItemErrorMessage = 'The item to remove is not in the CycleList';
  public static removeNotFoundItemError = new Error(CyclicListError.removeNotFoundItemErrorMessage);
}
