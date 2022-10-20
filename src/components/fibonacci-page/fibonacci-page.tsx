import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { delay } from "../../utils/delay";
import styles from "./fibonacci.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IArrElement } from "../../types/arr-element";

export const FibonacciPage: FC = () => {
  const [ value, setValue ] = useState<number>(0);
  const [ fibonacciResult, setFibonacciResult ] = useState<JSX.Element[]>([]);
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(e.target.value))
  };

  const renderResult = (fibonacci: IArrElement<number>[]) => {
    !!fibonacci.length && setFibonacciResult(fibonacci.map((item, index) => {
      return (
        <li key={index}>
          <Circle
            letter={`${item.value}`}
            state={item.state}
            tail={`${index}`}
          />
        </li>
      );
    }));
  };

  const checkValidity = () => {
    if (value) {
      if (value <= 0 || value > 19) return true;
      return false;
    }
    return false;
  };

    const handleForm = async (evt: FormEvent) => {
      evt.preventDefault();
      const fibonacci: IArrElement<number>[] = [];
      setIsStart(true);
      fibonacci.push({ value: 1, state: ElementStates.Default });
      renderResult(fibonacci);
      await delay(SHORT_DELAY_IN_MS);

      for (let i = 1; i <= value; i++) {
        await delay(SHORT_DELAY_IN_MS);
        if (i < 2) {
          fibonacci.push({ value: 1, state: ElementStates.Default });
        } else {
          fibonacci.push({ value: fibonacci[i - 1].value + fibonacci[i - 2].value, state: ElementStates.Default });

        }
        await delay(SHORT_DELAY_IN_MS);
        renderResult(fibonacci);
    }
    setIsStart(false);
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
        onChange={handleChange}
      />
      <Button
        type="submit"
        text="Рассчитать"
        disabled={isStart || checkValidity()}
        isLoader={isStart}
      />
     </form>
     <ul className={styles.content}>
      { fibonacciResult }
     </ul>
    </SolutionLayout>
  );
};
