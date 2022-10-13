import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { generateArray, getSortingArr } from "../../services/slices/sorting.slice";
import { Column } from "../ui/column/column";
import styles from "./sorting.module.css";
import { SELECTION_SORT } from "../../constants/saga.constants";

export const SortingPage: FC = () => {
  const [sortingType, setSortingType] = useState('select');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(generateArray());
  }, [dispatch]);

  const checkRadioInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingType(evt.target.value);
  };

  const onAscendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch({ type: SELECTION_SORT, direction: Direction.Ascending });
  }

  const onDescendingSortingButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch({ type: SELECTION_SORT, direction: Direction.Descending });
  }

  const array = useAppSelector(getSortingArr);

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
          />
          <RadioInput
            label="Пузырёк"
            value={"bubble"}
            name="sortingType"
            checked={sortingType === "bubble"}
            onChange={checkRadioInput}
          />
        </fieldset>
        <div className={styles.buttonContainer}>
          <fieldset className={styles.submitContainer}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={onAscendingSortingButtonClick}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={onDescendingSortingButtonClick}
            />
          </fieldset>
        <Button
          text= "Новый массив"
          onClick={() => dispatch(generateArray())}
        />
        </div>
      </form>
      <ul className={styles.content}>
        {
          array.map((element) => {
            return (
              <li key={element.id}>
                <Column
                  index={element.value}
                  state={element.state}
                />
              </li>
            );
          })
        }
      </ul>
    </SolutionLayout>
  );
};
