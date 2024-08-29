import { useSearchParams } from "react-router-dom";

import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import { RestorePassword } from "./RestorePassword";
import { AuthFormTypesValues } from "./constants";

import styles from "./AuthForm.module.css";

const forms: Record<AuthFormTypesValues, () => JSX.Element> = {
  "log-in": LogIn,
  "sign-up": SignUp,
  "restore-password": RestorePassword,
} as const;

type Props = {};

export const AuthForm = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const currentForm =
    (searchParams.get("form") as AuthFormTypesValues) ?? "log-in";
  const Form = forms[currentForm];

  return (
    <div className={styles.authForm}>
      <Form />
    </div>
  );
};
