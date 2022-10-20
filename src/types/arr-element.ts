import { ElementStates } from "./element-states";

export interface IArrElement<T> {
  value: T;
  state: ElementStates;
};
