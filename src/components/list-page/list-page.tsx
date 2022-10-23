import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { List } from "./list";
import { IArrElement } from "../../types/arr-element";
import { ListActionStates } from "../../types/list";
import { generateArr, delay } from "../../utils/";
import styles from "./list.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const list = new List<string>();

const initialList = generateArr(0, 100, 4, 4).map((item) => ({ ...item, value: `${item.value}`, isHead: false }));

export const ListPage: FC = () => {
  const [ value, setValue] = useState("");
  const [ index, setIndex ] = useState<number | string>("");
  const [ listState, setListState ] = useState<IArrElement<string | null>[]>([]);
  const [ renderResult, setRenderResult ] = useState<JSX.Element[]>();
  const [ animationState, setAnimationState ] = useState<ListActionStates>(ListActionStates.Idle);

  useEffect(() => {
    const { length } = initialList;
    for (let i = 0; i < length; i++) {
      list.append(`${initialList[i].value}`);
    }
    setListState(initialList);
  }, []);

  const renderList = () => {
    setRenderResult(listState.map((listItem, idx) => {
      let head: string | JSX.Element = "";
      let tail: string | JSX.Element = "";
      let letter = listItem.value || "";
      if (idx === 0) {
        head = "head";
      }
      if (idx === list.getSize() - 1) {
        tail = "tail";
      }
      if (listItem.isHead) {
        head = <Circle state={ElementStates.Changing} letter={value} isSmall={true} />;
      }
      if (listItem.isTail && listItem.value) {
        tail = <Circle state={ElementStates.Changing} letter={listItem.value} isSmall={true} />;
        letter = "";
      }
      return (
        <li key={idx} className={styles.container_item}>
          <Circle
            state={listItem.state}
            letter={letter}
            index={idx}
            head={head}
            tail={tail}
          />
        </li>
      );
    }))
  };

  const inputValueHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const inputIndexHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setIndex(Number(e.target.value));
  };

  useEffect(() => renderList(), [listState]);

  const addToHeadButtonHandler = async () => {
    setAnimationState(ListActionStates.AddInHead);
    list.insertAt(value, 0);
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: ElementStates.Default, isHead: index === 0 })));
    await delay(SHORT_DELAY_IN_MS);
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: index === 0 ? ElementStates.Modified : ElementStates.Default, isHead: false })));
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    setListState(list.getValues().map((listItem) => ({ value: listItem, state: ElementStates.Default })));
    setAnimationState(ListActionStates.Idle);
  };

  const addToTailButtonHandler = async () => {
    setAnimationState(ListActionStates.AddInTail);

    for (let i = 0; i < list.getSize(); i++) {
      setListState(list.getValues().map((listItem, index) => ({
        value: listItem,
        state: index <= i ? ElementStates.Changing : ElementStates.Default,
        isHead: i === index ? true : false
      })));
      await delay(SHORT_DELAY_IN_MS);
    }
    list.insertAt(value, list.getSize());
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: index === list.getSize() - 1 ? ElementStates.Modified : ElementStates.Default })));
    await delay(SHORT_DELAY_IN_MS);
    setListState(list.getValues().map((listItem) => ({ value: listItem, state: ElementStates.Default })));
    setValue("");
    setAnimationState(ListActionStates.Idle);
  };

  const removeFromHeadButtonHandler = async () => {
    setAnimationState(ListActionStates.RemoveFromHead);
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: ElementStates.Default, isTail: index === 0 })));
    await delay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: index === 0 ? ElementStates.Modified : ElementStates.Default, isTail: false })));
    setValue("");
    await delay(SHORT_DELAY_IN_MS);
    setListState(list.getValues().map((listItem) => ({ value: listItem, state: ElementStates.Default })));
    setValue("");
    setAnimationState(ListActionStates.Idle);
  };

  const removeFromTailButtonHandler = async () => {
    setAnimationState(ListActionStates.RemoveFromTail);
    const tailIndex = list.getSize() - 1;
    for (let i = 0; i <= tailIndex; i++) {
      setListState(list.getValues().map((listItem, index) => ({
        value: listItem,
        state: index <= i ? ElementStates.Changing : ElementStates.Default,
        isTail: i === tailIndex && index === tailIndex ? true : false
      })));
      await delay(SHORT_DELAY_IN_MS);
    }
    list.deleteAt(tailIndex);
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: ElementStates.Default })));
    setValue("");
    setAnimationState(ListActionStates.Idle);
  };

  const addByIndexButtonHandler = async () => {
    setAnimationState(ListActionStates.AddByIndex);
    for (let i = 0; i <= Number(index); i++) {
      setListState(list.getValues().map((listItem, idx) => ({
        value: listItem,
        state: idx <= i ? ElementStates.Changing : ElementStates.Default,
        isHead: i === idx ? true : false
      })));
      await delay(SHORT_DELAY_IN_MS);
    }
    list.insertAt(value, Number(index));
    setListState(list.getValues().map((listItem, idx) => ({ value: listItem, state: idx === Number(index) ? ElementStates.Modified : ElementStates.Default })));
    await delay(SHORT_DELAY_IN_MS);
    setListState(list.getValues().map((listItem) => ({ value: listItem, state: ElementStates.Default })));
    setValue("");
    setIndex("");
    setAnimationState(ListActionStates.Idle);
  };

  const removeByIndexButtonHandler = async () => {
    setAnimationState(ListActionStates.AddByIndex);
    const tailIndex = Number(index);
    for (let i = 0; i <= tailIndex; i++) {
      setListState(list.getValues().map((listItem, index) => ({
        value: listItem,
        state: index <= i ? ElementStates.Changing : ElementStates.Default,
        isTail: i === tailIndex && index === tailIndex ? true : false
      })));
      await delay(SHORT_DELAY_IN_MS);
    }
    list.deleteAt(tailIndex);
    setListState(list.getValues().map((listItem, index) => ({ value: listItem, state: ElementStates.Default })));
    setIndex("");
    setAnimationState(ListActionStates.Idle);
  };

  return (
    <SolutionLayout title="Связный список">
      <form>
        <fieldset className={styles.row}>
            <Input
              type="text"
              maxLength={4}
              max={"Максимум - 4 символа"}
              isLimitText={true}
              value={value}
              onChange={inputValueHandler}
              placeholder="Введите значение"
              extraClass={styles.input}
            />
            <Button
              type="button"
              text="Добавить в head"
              extraClass={styles.button_s}
              onClick={addToHeadButtonHandler}
              disabled={!value || animationState !== ListActionStates.Idle }
              isLoader={animationState === ListActionStates.AddInHead}
            />
            <Button
              type="button"
              text="добавить в tail"
              extraClass={styles.button_s}
              onClick={addToTailButtonHandler}
              disabled={!value || animationState !== ListActionStates.Idle }
              isLoader={animationState === ListActionStates.AddInTail}
            />
            <Button
              type="button"
              text="удалить из head"
              extraClass={styles.button_s}
              onClick={removeFromHeadButtonHandler}
              disabled={list.getSize() === 0 || animationState !== ListActionStates.Idle }
              isLoader={animationState === ListActionStates.RemoveFromHead}
            />
          <Button
            type="button"
            text="удалить из tail"
            extraClass={styles.button_s}
            onClick={removeFromTailButtonHandler}
            disabled={list.getSize() === 0 || animationState !== ListActionStates.Idle }
            isLoader={animationState === ListActionStates.RemoveFromTail}
        />
        </fieldset>

        <fieldset className={styles.row}>
            <Input
              type="text"
              value={index}
              onChange={inputIndexHandler}
              placeholder="Введите индекс"
              extraClass={styles.input}
            />
            <Button
              type="button"
              text="Добавить по индексу"
              extraClass={styles.button}
              onClick={addByIndexButtonHandler}
              disabled={
                !value
                || !index
                || animationState !== ListActionStates.Idle
                || Number(index) < 0
                || Number(index) >= list.getSize()
              }
              isLoader={animationState === ListActionStates.AddByIndex}
            />
            <Button
              type="button"
              text="Удалить по индексу"
              extraClass={styles.button}
              onClick={removeByIndexButtonHandler}
              disabled={
                !index
                || animationState !== ListActionStates.Idle
                || Number(index) < 0
                || Number(index) >= list.getSize()
              }
              isLoader={animationState === ListActionStates.RemoveByIndex}
            />
          </fieldset>
      </form>
      <ul className={styles.container}>
        { renderResult }
      </ul>

    </SolutionLayout>
  );
};
