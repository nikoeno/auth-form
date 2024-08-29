import React, { useState } from "react";
import {
  UnhandledError,
  UserDoesNotExistError,
  WrongPasswordError,
} from "src/shared/errors";
import { Button } from "src/shared/ui/Button";
import { Checkbox } from "src/shared/ui/Checkbox";
import { ErrorText } from "src/shared/ui/ErrorText";
import { Input } from "src/shared/ui/Input";
import { Link } from "src/shared/ui/Link";
import { Loader } from "src/shared/ui/Loader";
import { useLogin } from "../model/useLogin";

import styles from "./Login.module.css";
import { AUTH_FORMS_TYPES } from "./constants";

export const LogIn = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const { logIn, isLoading } = useLogin();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await logIn({ password: passwordValue, email: emailValue });

    if (res instanceof WrongPasswordError) {
      setError("Wrong password");
    } else if (res instanceof UserDoesNotExistError) {
      setError("User with this email doesn't exist");
    } else if (res instanceof UnhandledError) {
      setError("Something went wrong :(");
    } else {
      alert("success");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Log in</h2>
      {isLoading && <Loader />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          value={emailValue}
          onChange={setEmailValue}
          placeholder="email"
          name="email"
          focusOnMount={true}
          autoComplete="email"
          className={styles.emailInput}
          required={true}
          isError={Boolean(error)}
          onFocus={() => setError("")}
        />
        <Input
          type="password"
          value={passwordValue}
          onChange={setPasswordValue}
          placeholder="password"
          name="password"
          required={true}
          isError={Boolean(error)}
          onFocus={() => setError("")}
        />
        <ErrorText text={error} className={styles.errorText} />
        <Button className={styles.submitButton} type="submit">
          Log in
        </Button>
      </form>
      <div className={styles.forgotPassword}>
        <Link to={`/?form=${AUTH_FORMS_TYPES.restorePassword}`}>
          Forgot password?
        </Link>
      </div>
      <div className={styles.footer}>
        <span className={styles.footerText}>Have no account yet?</span>
        <Link to={`/?form=${AUTH_FORMS_TYPES.signUp}`}>Sign up</Link>
      </div>
    </div>
  );
};
