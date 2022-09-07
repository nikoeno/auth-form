import cls from "classnames";
import styles from "./ErrorText.module.css";

type Props = {
  text: string;
  className?: string;
};

export const ErrorText = ({ text, className }: Props) => {
  if (!text) {
    return null;
  }

  return <p className={cls(styles.text, className)}>{text}</p>;
};
