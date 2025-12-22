import { Weight } from 'shared';
import { CyclicListStructureInterface } from './cyclic-list.structure-interface';
import { CyclicListError } from './cyclic-list.error';

export class CyclicListStructure<T extends Weight> implements CyclicListStructureInterface<T> {
  private _heaviestWrapper: ItemWrapper<T> | undefined = undefined;
  private _currentWrapper: ItemWrapper<T> | undefined;

  public next(): T {
    this._currentWrapper = this._currentWrapper ? this._currentWrapper.next : this._heaviestWrapper;
    if (this._currentWrapper) {
      return this._currentWrapper.item;
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

    let currentWrapper = this._heaviestWrapper;
    do {
      if (item.weight > currentWrapper.item.weight) {
        this.insertWrapperBefore(newWrapper, currentWrapper);
        // if currentWrapper was the heaviestWrapper, then it needs to be reassigned
        if (currentWrapper === this._heaviestWrapper) {
          this._heaviestWrapper = newWrapper;
        }
        return;
      }
      currentWrapper = currentWrapper.next!;
    } while (currentWrapper !== this._heaviestWrapper); // looping through all the wrappers, stop when it came back to start
    // the item has not found any item bigger than him, he is then the lightest item in the collection
    // insert right before heaviest without reassigning the heaviest wrapper
    this.insertWrapperBefore(newWrapper, this._heaviestWrapper);
  }

  public removeItem(item: T): void {
    // empty list case
    if (!this._heaviestWrapper) {
      return;
    }
    let current = this._heaviestWrapper;
    do {
      if (item === current.item) {
        return this.removeWrapper(current);
      }
      current = current.next!;
    } while (current !== this._heaviestWrapper);
    throw CyclicListError.removeNotFoundItemError;
  }

  public get entryPoint(): T | undefined {
    return this._heaviestWrapper?.item;
  }

  private insertWrapperBefore(newWrapper: ItemWrapper<T>, nextWrapper: ItemWrapper<T>): void {
    newWrapper.next = nextWrapper;
    newWrapper.previous = nextWrapper.previous;
    nextWrapper.previous!.next = newWrapper;
    nextWrapper.previous = newWrapper;
  }

  private removeWrapper(wrapper: ItemWrapper<T>): void {
    if (wrapper === this._heaviestWrapper) {
      if (this._heaviestWrapper.next === this._heaviestWrapper) {
        //it was the only element in the list
        this._heaviestWrapper = undefined;
        this._currentWrapper = undefined;
      } else {
        //next item become the new heaviestWrapper
        this._heaviestWrapper = this.unlinkWrapper(wrapper);
      }
    } else {
      this.unlinkWrapper(wrapper);
    }
  }

  private unlinkWrapper(wrapper: ItemWrapper<T>): ItemWrapper<T> | undefined {
    const prev = wrapper.previous;
    const next = wrapper.next;
    prev!.next = next;
    next!.previous = prev;
    if (this._currentWrapper === wrapper) {
      this._currentWrapper = next;
    }
    return next;
  }
}

class ItemWrapper<T> {
  readonly item: T;
  previous?: ItemWrapper<T>;
  next?: ItemWrapper<T>;

  constructor(current: T) {
    this.item = current;
  }
}
