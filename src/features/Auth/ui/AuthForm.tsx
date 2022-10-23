import { useSearchParams } from "react-router-dom";
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

import styles from "./AuthForm.module.css";
import { RestorePassword } from "./RestorePassword";

type Props = {};
const forms = {
  "log-in": LogIn,
  "sign-up": SignUp,
  "restore-password": RestorePassword,
} as const;

type FormKeys = keyof typeof forms;

export const AuthForm = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const currentForm = (searchParams.get("form") as FormKeys) ?? "log-in";
  const Form = forms[currentForm];

  return (
    <div className={styles.authForm}>
      <Form />
    </div>
  );
};
