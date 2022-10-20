import { IStack } from "../types/stack";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  }

  pop = () => {
    this.container.pop();
  }

  clear = () => {
    this.container = [];
  }

  getElements = () => {
    return this.container;
  };

  peak = () => {
    const length = this.getSize();
    if (length > 0) {
      return this.container[length - 1];
    }
    return null;
  }

  getSize = () => this.container.length;
};
