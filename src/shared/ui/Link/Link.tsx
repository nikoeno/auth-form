import {
  ButtonHTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from "react";
import cls from "classnames";
import { Link as RouterLink } from "react-router-dom";

import styles from "./Link.module.css";

type Props = {
  className?: string;
  children: ReactNode;
  onClick?: (e: SyntheticEvent) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: string;
  to?: string;
};

export const Link = ({
  type,
  children,
  className,
  onClick,
  href,
  to,
}: Props) => {
  if (to) {
    return <RouterLink to={to}>{children}</RouterLink>;
  }

  if (onClick && !href) {
    return (
      <button
        className={cls(className, styles.link)}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      // I don't know why, but it's not focusing with tab without it (chrome, mac os) :)
      tabIndex={0}
      className={cls(className, styles.link)}
      onClick={onClick}
      href={href}
    >
      {children}
    </a>
  );
};
