import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states"
import { DELAY_IN_MS } from "../../constants/delays";
import { MAX_STRING_LENGTH } from "../../constants/string";
import { delay } from "../../utils";
import { reversString } from "./util";
import { IArrElement } from "../../types/arr-element";
import styles from "./string.module.css";

export const StringComponent: FC = () => {
  const [value, setValue] = useState<IArrElement<string>[]>([]);
  const [userInput, setUserInput] = useState("");
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
    setUserInput(e.target.value);
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
    const reversedString = reversString(userInput);
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
      arr[start].value = reversedString[start];
      arr[end].value = reversedString[end];
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
          maxLength={MAX_STRING_LENGTH}
          max={"Максимум 11 символов"}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.button}
          type="submit"
          text="Развернуть"
          disabled={!value.length || isReverse}
          isLoader={ isReverse }
        />
      </form>
      <ul className={styles.content}>
        { reverseResult }
      </ul>
    </SolutionLayout>
  );
};
