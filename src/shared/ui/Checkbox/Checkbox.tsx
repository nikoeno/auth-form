import cls from "classnames";

import { CheckIcon } from "../Icons";
import styles from "./Checkbox.module.css";
import { ErrorText } from "../ErrorText";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  text?: string;
  error?: string;
};

export const Checkbox = ({
  value,
  onChange,
  className,
  text,
  error,
}: Props) => {
  return (
    <div className={className}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
          className={styles.input}
        />
        <div className={styles.checkboxWithText}>
          <div
            className={cls(styles.checkbox, {
              [styles.checkboxChecked]: value,
              [styles.checkboxWithMargin]: Boolean(text),
            })}
          >
            <CheckIcon
              className={cls(styles.icon, {
                [styles.visible]: value,
              })}
            />
          </div>
          <div className={styles.text}>{text}</div>
        </div>
        {error && <ErrorText text={error} className={styles.checkboxError} />}
      </label>
    </div>
  );
};
