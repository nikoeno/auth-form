import { useState } from "react";

import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

import styles from "./AuthForm.module.css";
import { RestorePassword } from "./RestorePassword";

type Props = {};
const forms = {
  logIn: LogIn,
  signUp: SignUp,
  restorePassword: RestorePassword,
} as const;

export const AuthForm = ({}: Props) => {
  const [currentForm, setCurrentForm] = useState<keyof typeof forms>("logIn");
  const Form = forms[currentForm];
  return (
    <div className={styles.authForm}>
      <Form onFormChange={(form) => setCurrentForm(form)} />
    </div>
  );
};
