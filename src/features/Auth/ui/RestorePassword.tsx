import React, { useState } from "react";
import { UnhandledError, UserDoesNotExistError } from "src/shared/errors";
import { Button } from "src/shared/ui/Button";
import { ErrorText } from "src/shared/ui/ErrorText";
import { Input } from "src/shared/ui/Input";
import { Link } from "src/shared/ui/Link";
import { Loader } from "src/shared/ui/Loader";

import { useRestorePassword } from "../model/useRestorePassword";

import styles from "./RestorePassword.module.css";

export const RestorePassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [error, setError] = useState("");
  const { restorePassword, isLoading } = useRestorePassword();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await restorePassword({ email: emailValue });
    if (res instanceof UserDoesNotExistError) {
      setError("User with this email doesn't exist");
    } else if (res instanceof UnhandledError) {
      setError("Something went wrong :(");
    } else {
      alert("success");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Restore password</h2>
      {isLoading && <Loader />}
      <p className={styles.text}>We will send restore link on your email.</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          value={emailValue}
          onChange={(v) => setEmailValue(v)}
          placeholder="email"
          name="email"
          focusOnMount={true}
          autoComplete="email"
          className={styles.emailInput}
          required={true}
          isError={Boolean(error)}
          onFocus={() => setError("")}
        />
        <ErrorText text={error} className={styles.errorText} />
        <Button className={styles.submitButton} type="submit">
          Send email
        </Button>
      </form>
      <div className={styles.footer}>
        <span className={styles.footerText}>Return to</span>
        <Link to="/?form=log-in">log in</Link>
      </div>
    </div>
  );
};
