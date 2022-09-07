import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import styles from "./Loader.module.css";

type PortalProps = {
  children: ReactNode;
};

const Portal = ({ children }: PortalProps) =>
  createPortal(children, document.body);

const LoaderArc = ({ className }: { className?: string }): JSX.Element => (
  <svg
    width={48}
    height={48}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h48v48H0z" />
      <path
        d="M42.997 23.976c0-9.999-7.716-18.196-17.52-18.962-.826-.064-1.5-.73-1.5-1.56 0-.829.674-1.507 1.501-1.45C36.941 2.774 46 12.317 46 23.975 46 36.14 36.14 46 23.976 46c-11.658 0-21.2-9.059-21.973-20.522-.056-.827.622-1.502 1.451-1.502.83 0 1.496.675 1.56 1.502.766 9.803 8.963 17.519 18.962 17.519 10.505 0 19.02-8.516 19.02-19.02z"
        fill="currentColor"
      />
    </g>
  </svg>
);

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
};

export const Loader = () => {
  useEffect(() => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles.overlay}></div>
        <div className={styles.loader}>
          <div className={styles.loaderIcon}>
            <LoaderArc />
          </div>
        </div>
      </div>
    </Portal>
  );
};
