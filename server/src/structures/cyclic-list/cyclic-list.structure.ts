import { Weight } from 'shared';
import { CyclicListStructureInterface } from './cyclic-list.structure-interface';
import { CyclicListError } from './cyclic-list.error';

export class CyclicListStructure<T extends Weight> implements CyclicListStructureInterface<T> {
  private _heaviestWrapper: ItemWrapper<T> | undefined = undefined;
  private _currentWrapper: ItemWrapper<T> | undefined;

  public next(): T {
    this._currentWrapper = this._currentWrapper ? this._currentWrapper.next : this._heaviestWrapper;
    if (this._currentWrapper) {
      return this._currentWrapper.current;
    }
    throw CyclicListError.nextOnEmptyListError;
  }

  public insertItem(item: T): void {
    const newWrapper = new ItemWrapper<T>(item);
    // empty list case
    if (!this._heaviestWrapper) {
      newWrapper.next = newWrapper;
      newWrapper.previous = newWrapper;
      this._heaviestWrapper = newWrapper;
      return;
    }

    let current = this._heaviestWrapper;
    do {
      if (item.weight > current.current.weight) {
        this.insertWrapperBefore(newWrapper, current);
        // if currentWrapper was the heaviestWrapper, then it needs to be reassigned
        if (current === this._heaviestWrapper) {
          this._heaviestWrapper = newWrapper;
        }
        return;
      }
      current = current.next!;
    } while (current !== this._heaviestWrapper); // looping through all the wrappers, stop when it came back to start
    // the item has not found any item bigger than him, he is then the lightest item in the collection
    // insert right before heaviest without reassigning the heaviest wrapper
    this.insertWrapperBefore(newWrapper, this._heaviestWrapper);
  }

  private insertWrapperBefore(newWrapper: ItemWrapper<T>, nextWrapper: ItemWrapper<T>): void {
    newWrapper.next = nextWrapper;
    newWrapper.previous = nextWrapper.previous;
    nextWrapper.previous!.next = newWrapper;
    nextWrapper.previous = newWrapper;
  }

  public get entryPoint(): T | undefined {
    return this._heaviestWrapper?.current;
  }
}

class ItemWrapper<T> {
  readonly current: T;
  previous?: ItemWrapper<T>;
  next?: ItemWrapper<T>;

  constructor(current: T) {
    this.current = current;
  }
}
