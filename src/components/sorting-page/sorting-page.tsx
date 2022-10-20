import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { delay, generateArr, swap } from "../../utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import styles from "./sorting.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IArrElement } from "../../types/arr-element";

export const SortingPage: FC = () => {
  const [ sortingType, setSortingType ] = useState("select");
  const [ arr, setArr ] = useState<IArrElement<number>[]>(generateArr());
  const [ isStart, setIsStart ] = useState<boolean>(false);

  const generateButtonHandler = () => {
    setArr(generateArr());
  };

  const selectionSort = async (arr: IArrElement<number>[], direction: Direction) => {
    const { length } = arr;

    for (let i = 0; i < length - 1; i++) {
      let baseIndex = i;
      arr[i].state = ElementStates.Changing;
      setArr([ ...arr ]);

      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setArr([ ...arr ]);
        await delay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Ascending) {
          if (arr[baseIndex].value > arr[j].value) baseIndex = j;
        }
        if (direction === Direction.Descending) {
          if (arr[baseIndex].value < arr[j].value) baseIndex = j;
        }

        arr[j].state = ElementStates.Default;
        setArr([ ...arr ]);
      }

      swap<IArrElement<number>>(arr, baseIndex, i);
      arr[baseIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArr([ ...arr ]);
    }
    arr[length - 1].state = ElementStates.Modified;
    setArr([ ...arr ]);
  };

  const bubbleSort = async (arr: IArrElement<number>[], direction: Direction) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArr([ ...arr ]);
        await delay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Ascending) {
          if (arr[j].value > arr[j + 1].value) swap(arr, j, j + 1);
        }
        if (direction === Direction.Descending) {
          if (arr[j].value < arr[j + 1].value) swap(arr, j, j + 1);
        }

        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setArr([ ...arr ]);
      }
      arr[length - i - 1].state = ElementStates.Modified;
      setArr([ ...arr ]);
    }
  }

  useEffect(() => {
    setArr(generateArr());
  }, []);

  const checkRadioInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingType(evt.target.value);
  };

  const onAscendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsStart(true);
    switch (sortingType) {
      case "select":
        arr && selectionSort(arr, Direction.Ascending);
        break;
      case "bubble":
        arr && bubbleSort(arr, Direction.Ascending);
        break;
      default:
        return arr;
    }
    setIsStart(false);
  }

  const onDescendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsStart(true);
    switch (sortingType) {
      case "select":
        arr && selectionSort(arr, Direction.Descending);
        break;
      case "bubble":
        arr && bubbleSort(arr, Direction.Descending);
        break;
      default:
        return arr;
    }
    setIsStart(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <fieldset className={styles.radioContainer}>
          <RadioInput
            label="Выбор"
            value={"select"}
            name="sortingType"
            checked={sortingType === "select"}
            onChange={checkRadioInput}
            disabled={isStart}
          />
          <RadioInput
            label="Пузырёк"
            value={"bubble"}
            name="sortingType"
            checked={sortingType === "bubble"}
            onChange={checkRadioInput}
            disabled={isStart}
          />
        </fieldset>
        <div className={styles.buttonContainer}>
          <fieldset className={styles.submitContainer}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={onAscendingSortingButtonClick}
              disabled={isStart}
              // isLoader={isSort}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={onDescendingSortingButtonClick}
              disabled={isStart}
              // isLoader={isSort}
            />
          </fieldset>
        <Button
          text= "Новый массив"
          onClick={generateButtonHandler}
          disabled={isStart}
          // isLoader={isSort}
        />
        </div>
      </form>
      <ul className={styles.content}>
        {
          arr && arr.map((el, index) => {
            return (
              <li key={index}>
                <Column
                  index={el.value}
                  state={el.state}
                />
              </li>
            );
          })
        }
      </ul>
    </SolutionLayout>
  );
};
