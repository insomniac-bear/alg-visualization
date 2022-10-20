import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { IArrElement } from "../../types/arr-element";
import { ElementStates } from "../../types/element-states";
import { delay, Stack } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./stack.module.css";

const stack = new Stack<string>();

export const StackPage: FC = () => {
  const [ value, setValue ] = useState("");
  const [ stackState, setStackState ] = useState<IArrElement<string>[]>([]);
  const [ renderResult, setRenderResult ] = useState<JSX.Element[]>([]);
  const [ isAddStart, setIsAddStart ] = useState(false);
  const [ isRemoveStart, setIsRemoveStart ] = useState(false);

  const renderStack = () => {
    setRenderResult(stackState.map((stackItem, index) => {
      return(
        <li key={index}>
          <Circle
            state={stackItem.state}
            letter={stackItem.value || ""}
            index={index}
            head={stack.getSize() - 1 === index ? "top" : ""}
          />
        </li>
      );
    }));
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const addButtonHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsAddStart(true);
    stack.push(value);
    let currentStackElements = stack.getElements().map((stackElement, index) => (
      { state: stack.getElements().length - 1 === index ? ElementStates.Changing : ElementStates.Default, value: stackElement }
    ));
    setStackState(currentStackElements);
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    currentStackElements = stack.getElements().map((stackElement) => ({ state: ElementStates.Default, value: stackElement }));
    setStackState(currentStackElements);
    setIsAddStart(false);
  };

  const clearButtonHandler = () => {
    stack.clear();
    setStackState([]);
  };

  const removeButtonHandler = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsRemoveStart(true);
    let currentStackElements = stack
      .getElements()
      .map((stackElement, index) => (
        { state: stack.getElements().length - 1 === index ? ElementStates.Changing : ElementStates.Default, value: stackElement }
      ));
    setStackState(currentStackElements);
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    currentStackElements = stack
      .getElements()
      .map((stackElement) => (
        { state: ElementStates.Default, value: stackElement }
      ));
    setStackState(currentStackElements);
    setIsRemoveStart(false);
  };
  useEffect(() => {
    if (stackState) renderStack();
  }, [stackState]);

  return (
    <SolutionLayout title="Стек">
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
            text="Добавить"
            onClick={addButtonHandler}
            disabled={isAddStart || isRemoveStart || !value}
            isLoader={isAddStart}
          />
          <Button
            text="Удалить"
            onClick={removeButtonHandler}
            disabled={isAddStart || isRemoveStart || !stackState.length}
            isLoader={isRemoveStart}
          />
        </fieldset>
        <Button
          text="Очистить"
          onClick={clearButtonHandler}
          disabled={isAddStart || isRemoveStart || !stackState.length}
          />
      </form>
      <ul className={styles.container}>
        { renderResult }
      </ul>
    </SolutionLayout>
  );
};
