export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  peak: () => T | null;
  getElements: () => T[];
  getSize: () => number;
};
