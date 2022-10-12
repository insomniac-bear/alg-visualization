import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states"
import { useAppSelector, useAppDispatch } from '../../services/store';
import styles from "./string.module.css";
import { getArrOfSymbols, getStatus } from "../../services/slices/revers-string.slice";
import { REVERSE } from "../../constants/saga.constants";

export const StringComponent: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const arrOfSymbols = useAppSelector(getArrOfSymbols);
  const processStatus = useAppSelector(getStatus);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const handleForm = (evt: FormEvent): void => {
    evt.preventDefault();
    const arrOfSymbols = value.split('').map((it, index) => ({ id: index, value: it, status: 'Default' }));
    dispatch({ type: REVERSE, arr: arrOfSymbols });
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleForm}>
        <Input
          maxLength={11}
          max={'Максимум 11 символов'}
          isLimitText={true}
          value={value}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.button}
          type="submit"
          text="Развернуть"
          disabled={!value || processStatus}
          isLoader={processStatus}
        />
      </form>
      <ul className={styles.content}>
        {
          !!arrOfSymbols.length &&
          arrOfSymbols.map((item) => {
            return (
              <li key={item.id}>
                <Circle
                  state={ElementStates[item.status]}
                  letter={item.value}
                />
              </li>
            )
          })
        }
      </ul>
    </SolutionLayout>
  );
};
