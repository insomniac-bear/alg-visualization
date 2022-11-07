import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { delay, generateArr, swap } from "../../utils";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SortingType } from "../../constants/sorting";
import { IArrElement } from "../../types/arr-element";
import styles from "./sorting.module.css";

export const SortingPage: FC = () => {
  const [ sortingType, setSortingType ] = useState(SortingType.Select);
  const [ arr, setArr ] = useState<IArrElement<number>[]>(generateArr());
  const [ sortingDirection, setSortingDirection ] = useState<Direction>();
  const [ isStart, setIsStart ] = useState<boolean>(false);

  const generateButtonHandler = () => {
    setArr(generateArr());
  };

  const selectionSort = async (arr: IArrElement<number>[], direction: Direction) => {
    setIsStart(true);
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
    setIsStart(false);
  };

  const bubbleSort = async (arr: IArrElement<number>[], direction: Direction) => {
    setIsStart(true);
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
    setIsStart(false);
  }

  useEffect(() => {
    setArr(generateArr());
  }, []);

  const checkRadioInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const type = evt.target.value === SortingType.Select ? SortingType.Select : SortingType.Bubble;
    setSortingType(type);
  };

  const onAscendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    setSortingDirection(Direction.Ascending);
    switch (sortingType) {
      case SortingType.Select:
        arr && sortingDirection && selectionSort(arr, Direction.Ascending);
        break;
      case SortingType.Bubble:
        arr && sortingDirection && bubbleSort(arr, Direction.Ascending);
        break;
      default:
        return arr;
    }
  }

  const onDescendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    setSortingDirection(Direction.Descending);
    switch (sortingType) {
      case SortingType.Select:
        arr && sortingDirection && selectionSort(arr, Direction.Descending);
        break;
      case SortingType.Bubble:
        arr && sortingDirection && bubbleSort(arr, Direction.Descending);
        break;
      default:
        return arr;
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <fieldset className={styles.radioContainer}>
          <RadioInput
            label="Выбор"
            value={SortingType.Select}
            name="sortingType"
            checked={sortingType === SortingType.Select}
            onChange={checkRadioInput}
            disabled={isStart}
          />
          <RadioInput
            label="Пузырёк"
            value={SortingType.Bubble}
            name="sortingType"
            checked={sortingType === SortingType.Bubble}
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
              isLoader={isStart && sortingDirection === Direction.Ascending}
              extraClass={styles.button}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={onDescendingSortingButtonClick}
              disabled={isStart}
              isLoader={isStart && sortingDirection === Direction.Descending}
              extraClass={styles.button}
            />
          </fieldset>
        <Button
          text= "Новый массив"
          onClick={generateButtonHandler}
          disabled={isStart}
          extraClass={styles.button}
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
