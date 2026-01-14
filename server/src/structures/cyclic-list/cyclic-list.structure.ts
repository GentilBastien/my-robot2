import { CyclicListStructureInterface } from './cyclic-list.structure-interface';
import { CyclicListError } from './cyclic-list.error';
import { Comparator } from 'shared';

export class CyclicListStructure<T> implements CyclicListStructureInterface<T> {
  private readonly _comparator: Comparator<T>;
  private _heaviestNode: ItemNode<T> | undefined;
  private _currentNode: ItemNode<T> | undefined;

  constructor(comparator: Comparator<T>) {
    this._comparator = comparator;
  }

  public get comparator(): Comparator<T> {
    return this._comparator;
  }

  public next(): T {
    this._currentNode = this._currentNode ? this._currentNode.next : this._heaviestNode;
    if (this._currentNode) {
      return this._currentNode.item;
    }
    throw CyclicListError.nextOnEmptyListError;
  }

  public insertItem(item: T): void {
    const newNode = new ItemNode<T>(item);
    // empty list case
    if (!this._heaviestNode) {
      newNode.next = newNode;
      newNode.previous = newNode;
      this._heaviestNode = newNode;
      return;
    }

    let currentNode = this._heaviestNode;
    do {
      if (this._comparator.compare(item, currentNode.item) > 0) {
        this.insertNodeBefore(newNode, currentNode);
        // if currentNode was the heaviestNode, then it needs to be reassigned
        if (currentNode === this._heaviestNode) {
          this._heaviestNode = newNode;
        }
        return;
      }
      currentNode = currentNode.next!;
    } while (currentNode !== this._heaviestNode); // looping through all the nodes, stop when it came back to start
    // the item has not found any item bigger than him, he is then the lightest item in the collection
    // insert right before heaviest without reassigning the heaviest node
    this.insertNodeBefore(newNode, this._heaviestNode);
  }

  public removeItem(item: T): void {
    // empty list case
    if (!this._heaviestNode) {
      return;
    }
    let current = this._heaviestNode;
    do {
      if (item === current.item) {
        return this.removeNode(current);
      }
      current = current.next!;
    } while (current !== this._heaviestNode);
    throw CyclicListError.removeNotFoundItemError;
  }

  public get entryPoint(): T | undefined {
    return this._heaviestNode?.item;
  }

  private insertNodeBefore(newNode: ItemNode<T>, nextNode: ItemNode<T>): void {
    newNode.next = nextNode;
    newNode.previous = nextNode.previous;
    nextNode.previous!.next = newNode;
    nextNode.previous = newNode;
  }

  private removeNode(node: ItemNode<T>): void {
    if (node === this._heaviestNode) {
      if (this._heaviestNode.next === this._heaviestNode) {
        //it was the only element in the list
        this._heaviestNode = undefined;
        this._currentNode = undefined;
      } else {
        //next item become the new heaviestNode
        this._heaviestNode = this.unlinkNode(node);
      }
    } else {
      this.unlinkNode(node);
    }
  }

  private unlinkNode(node: ItemNode<T>): ItemNode<T> | undefined {
    const prev = node.previous;
    const next = node.next;
    prev!.next = next;
    next!.previous = prev;
    if (this._currentNode === node) {
      this._currentNode = next;
    }
    return next;
  }
}

class ItemNode<T> {
  readonly item: T;
  previous?: ItemNode<T>;
  next?: ItemNode<T>;

  constructor(current: T) {
    this.item = current;
  }
}
