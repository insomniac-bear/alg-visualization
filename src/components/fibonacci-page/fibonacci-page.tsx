import { ChangeEvent, FC, FormEvent, useState } from "react";
import { FIBONACCI } from "../../constants/saga.constants";
import { getFibonacciRange, getStatus } from "../../services/slices/fibonacci.slice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci.module.css';

export const FibonacciPage: FC = () => {
  const [value, setValue] = useState<number>();
  const dispatch = useAppDispatch();
  const fibonacciRange = useAppSelector(getFibonacciRange);
  const processStatus = useAppSelector(getStatus);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(e.target.value))
  };

  const checkValidity = () => {
    if (value) {
      if (value <= 0 || value > 19) return true;
      return false;
    }
    return false;
  };

  const handleForm = (evt: FormEvent): void => {
    evt.preventDefault();
    dispatch({ type: FIBONACCI, toNumber: value });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={handleForm} >
      <Input
        type="number"
        min={1}
        max={19}
        isLimitText={true}
        maxLength={2}
        value={value || ''}
        onChange={handleChange}
      />
      <Button
        type="submit"
        text="Рассчитать"
        disabled={checkValidity() || processStatus}
        isLoader={processStatus}
      />
     </form>
     <ul className={styles.content}>
      {
        !!fibonacciRange.length
        && fibonacciRange.map((number) => {
          return (
            <li key={number.id}>
              <Circle
                letter={String(number.value)}
                tail={String(number.id)}
              />
            </li>
          );
        })
      }
     </ul>
    </SolutionLayout>
  );
};
