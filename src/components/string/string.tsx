import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states"
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils";
import styles from "./string.module.css";
import { IArrElement } from "../../types/arr-element";

export const StringComponent: FC = () => {
  const [value, setValue] = useState<IArrElement<string>[]>([]);
  const [reverseResult, setReverseResult] = useState<JSX.Element[]>([]);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const renderResult = () => {
    setReverseResult(value.map((item, index) => {
      return (
        <li key={index}>
          <Circle
            letter={item.value}
            state={item.state}
          />
        </li>
      );
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value.split('').map((item) => {
      return {
        value: item,
        state: ElementStates.Default,
      };
    }));
  };

  const handleForm = async (evt: FormEvent) => {
    evt.preventDefault();
    setIsReverse(true);
    renderResult();
    const arr = value;
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
      await delay(DELAY_IN_MS);
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setValue(arr);
      renderResult();
      await delay(DELAY_IN_MS);
      swap<IArrElement<string>>(arr, start, end);
      arr[start].state = ElementStates.Modified;
      arr[end].state = ElementStates.Modified;
      setValue(arr);
      renderResult();
      start++;
      end--;
    }
    setIsReverse(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleForm}>
        <Input
          maxLength={11}
          max={"Максимум 11 символов"}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.button}
          type="submit"
          text="Развернуть"
          disabled={!value || isReverse}
          isLoader={ isReverse }
        />
      </form>
      <ul className={styles.content}>
        { reverseResult }
      </ul>
    </SolutionLayout>
  );
};
