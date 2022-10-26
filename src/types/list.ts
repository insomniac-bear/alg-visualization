import { LinkedListNode } from "../components/list-page/list";

export interface IList<T> {
  append: (element: T) => void;
  addByIndex: (element: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  toArray: () => T[];
  getSize: () => number;
  getHead: () => LinkedListNode<T> | null;
};

export enum ListActionStates {
  Idle = "idle",
  AddInHead = "add in head",
  AddInTail = "add in tail",
  RemoveFromHead = "remove from head",
  RemoveFromTail = "remove from tail",
  AddByIndex = "add by index",
  RemoveByIndex = "remove by index",
};
