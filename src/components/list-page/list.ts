import { IList } from "../../types/list";

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements IList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(initialArr?: T[]) {
    if (initialArr) {
      const { length } = initialArr;
      let curr = new LinkedListNode(initialArr[length - 1]);
      let temp;
      for (let i = length - 2; i >= 0; i--) {
        temp = new LinkedListNode<T>(initialArr[i], curr);
        curr = temp;
      }
      this.head = curr;
      this.size = length;
    } else {
      this.head = null;
      this.size = 0;
    }
  }

  append (element: T) {
    const node = new LinkedListNode(element);
    let curr;
    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  addByIndex (element: T, index: number) {
    if (index <0 || index > this.size) {
      throw new Error("Enter a valid Index");
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index) {
          currIndex++;
          if (curr?.next && currIndex !== index) {
            curr = curr?.next;
          }
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
      this.size++;
    }
  }

  deleteByIndex (index: number) {
    if (index <0 || index > this.size) {
      throw new Error("Enter a valid Index");
    } else {
      if (index === 0 && this.head) {
        this.head = this.head?.next;
      } else {
        let curr = this.head;
        let prev = curr;
        let currIndex = 0;
        while (currIndex < index) {
          currIndex++;
          if (curr?.next) {
            prev = curr;
            curr = curr.next;
          }
        }
        if (curr && prev) {
          prev.next = curr.next;
        }
        this.size--;
      }
    }
  }

  deleteHead () {
    if (this.head !== null) {
      this.head = this.head?.next;
      this.size--;
    } else {
      throw new Error("List is empty!!!");
    }
  }

  toArray (): T[] {
    let curr = this.head;
    const values: T[] = [];
    while (curr) {
      values.push(curr.value);
      curr = curr.next;
    }
    return values;
  }

  getSize () {
    return this.size;
  }

  getHead () {
    return this.head;
  }
}
