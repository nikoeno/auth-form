import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from "classnames";

import styles from "./Button.module.css";

type Props = {
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  className?: string;
  isDisabled?: boolean;
  children: ReactNode;
};

export const Button = ({ type, children, className, isDisabled }: Props) => {
  return (
    <button
      type={type}
      className={cls(className, styles.button)}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
