import { Node } from "../components/list-page/list";

export interface IList<T> {
  append: (element: T) => void;
  insertAt: (element: T, index: number) => void;
  deleteAt: (index: number) => void;
  deleteHead: () => void;
  getValues: () => T[];
  getSize: () => number;
  getHead: () => Node<T> | null;
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
