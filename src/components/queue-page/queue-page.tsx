import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QUEUE_SIZE } from "../../constants/queue";
import { IArrElement } from "../../types/arr-element";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Queue } from "./queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";

const queue = new Queue<string>(QUEUE_SIZE);

function fillQueState(state: ElementStates, element?: "tail" | "head") {
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
}

export const QueuePage: FC = () => {
  const [ value, setValue ] = useState("");
  const [ queueState, setQueueState ] = useState<IArrElement<string | null>[]>(fillQueState(ElementStates.Default));
  const [ renderResult, setRenderResult ] = useState<JSX.Element[]>([]);
  const [ isAddStart, setIsAddStart ] = useState(false);
  const [ isRemoveStart, setIsRemoveStart ] = useState(false);

  const renderQueue = () => {
    setRenderResult(queueState.map((queueItem, index) => {
      return(
        <li key={index}>
          <Circle
            state={queueItem.state}
            letter={queueItem.value || ""}
            index={index}
            head={queue.getHead() === index && queue.getElement(index) ? "top" : ""}
            tail={queue.getTail() === index + 1 && queue.getElement(index) ? "tail" : ""}
          />
        </li>
      );
    }));
  }

  const addButtonHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsAddStart(true);
    queue.enqueue(value);
    let currentQueueElements = fillQueState(ElementStates.Changing, "tail");
    setQueueState(currentQueueElements);
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    currentQueueElements = fillQueState(ElementStates.Default, "tail");
    setQueueState(currentQueueElements);
    setIsAddStart(false);
  };

  const removeButtonHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsRemoveStart(true);
    let currentQueueElements = fillQueState(ElementStates.Changing, "head");
    setQueueState(currentQueueElements);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    currentQueueElements = fillQueState(ElementStates.Default, "head");
    setQueueState(currentQueueElements);

    if (queue.isEmpty()) {
      queue.clear();
      currentQueueElements = fillQueState(ElementStates.Default);
      setQueueState(currentQueueElements);
    }

    setIsRemoveStart(false);
  };

  const clearButtonHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    queue.clear();
    const currentQueueElements = fillQueState(ElementStates.Default);
    setQueueState(currentQueueElements);

    setIsRemoveStart(false);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  useEffect(() => renderQueue(), [queueState]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <fieldset className={styles.input_container}>
          <Input
            type="text"
            maxLength={4}
            max={"Максимум - 4 символа"}
            isLimitText={true}
            value={value}
            onChange={inputHandler}
            placeholder="Введите значение"
            extraClass={styles.input}
          />
          <Button
            type="button"
            text="Добавить"
            onClick={addButtonHandler}
            disabled={isAddStart || isRemoveStart || !value || queue.isFill()}
            isLoader={isAddStart}
          />
          <Button
            type="button"
            text="Удалить"
            onClick={removeButtonHandler}
            disabled={isAddStart || isRemoveStart || queue.isEmpty()}
            isLoader={isRemoveStart}
          />
        </fieldset>
        <Button
          type="button"
          text="Очистить"
          onClick={clearButtonHandler}
          disabled={isAddStart || isRemoveStart || queue.isEmpty()}
        />
      </form>
      <ul className={styles.container}>
        {renderResult}
      </ul>
    </SolutionLayout>
  );
};
