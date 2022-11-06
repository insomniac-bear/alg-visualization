import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay, checkValidity } from "../../utils";
import { getFibonacciNumbers } from "./util";
import { MIN_FIBONACCI_COUNT, MAX_FIBONACCI_COUNT } from "./const";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci.module.css";

export const FibonacciPage: FC = () => {
  const [ value, setValue ] = useState<number>(0);
  const [ fibonacciResult, setFibonacciResult ] = useState<JSX.Element[]>([]);
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(e.target.value));
  };

  const handleForm = async (evt: FormEvent) => {
    evt.preventDefault();
    const fibonacci: number[] = getFibonacciNumbers(value);
    setIsStart(true);
    if (fibonacciResult.length > 0) setFibonacciResult([])
    for (let idx = 0; idx < value; idx++) {
      setFibonacciResult((prevState) => {
        return([
          ...prevState,
          <li key={idx}>
            <Circle
              letter={`${fibonacci[idx]}`}
              state={ElementStates.Default}
              tail={`${idx + 1}`}
            />
          </li>
        ]);
      });
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsStart(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={handleForm} >
      <Input
        type="number"
        min={MIN_FIBONACCI_COUNT}
        max={MAX_FIBONACCI_COUNT}
        isLimitText={true}
        onChange={handleChange}
      />
      <Button
        type="submit"
        text="Рассчитать"
        disabled={isStart || !checkValidity(value, MIN_FIBONACCI_COUNT, MAX_FIBONACCI_COUNT) || value <= 0}
        isLoader={isStart}
      />
     </form>
     <ul className={styles.content}>
      { fibonacciResult }
     </ul>
    </SolutionLayout>
  );
};
