import { QUEUE_SIZE } from "../../constants/queue";
import { IArrElement } from "../../types/arr-element";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";

export function fillQueState(state: ElementStates, queue: Queue<string>, element?: "tail" | "head") {
  const queueState: IArrElement<string | null>[] = [];
  for (let i = 0; i < QUEUE_SIZE; i++) {
    const value = i >= queue.getHead() && i < queue.getTail()
      ? queue.getElement(i)
      : "";

    let elementState  = ElementStates.Default;
    if (state !== ElementStates.Default) {
      if (element === "tail") {
        elementState = i === queue.getTail() - 1 ? state : ElementStates.Default;
      } else if (element === "head") {
        elementState = i === queue.getHead() ? state : ElementStates.Default;
      }
    }
    queueState.push({ value, state: elementState });
  }
  return queueState;
};
