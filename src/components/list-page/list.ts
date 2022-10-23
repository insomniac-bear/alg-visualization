import { IList } from "../../types/list";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class List<T> implements IList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append (element: T) {
    const node = new Node(element);
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

  insertAt (element: T, index: number) {
    if (index <0 || index > this.size) {
      throw new Error("Enter a valid Index");
    } else {
      const node = new Node(element);
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

  deleteAt (index: number) {
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

  getValues (): T[] {
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
