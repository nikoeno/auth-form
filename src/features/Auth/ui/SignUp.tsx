import React, { useEffect, useRef, useState } from "react";
import { UnhandledError, UserAlreadyExists } from "src/shared/errors";
import { Button } from "src/shared/ui/Button";
import { Checkbox } from "src/shared/ui/Checkbox";
import { ErrorText } from "src/shared/ui/ErrorText";
import { Input } from "src/shared/ui/Input";
import { Link } from "src/shared/ui/Link";
import { Loader } from "src/shared/ui/Loader";
import { useSignUp } from "../model/useRegister";

import styles from "./SignUp.module.css";

type SignUpProps = {
  onFormChange: (newForm: "logIn") => void;
};

export const SignUp = ({ onFormChange }: SignUpProps) => {
  const [isAgreementChecked, setIsAgreementChecked] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const { signUp, isLoading } = useSignUp();
  const [error, setError] = useState("");
  const repeatPasswordInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const areFieldsFilled = passwordValue && passwordRepeatValue;
    const areFieldsEqual = passwordValue === passwordRepeatValue;
    const areEnoughPasswordLength = passwordValue.length >= 5;

    if (!areEnoughPasswordLength) {
      repeatPasswordInputRef.current?.setCustomValidity(
        "passwords should be at least 5 symbols"
      );
    } else if (areFieldsFilled && !areFieldsEqual) {
      repeatPasswordInputRef.current?.setCustomValidity(
        "passwords should be equal"
      );
    } else {
      repeatPasswordInputRef.current?.setCustomValidity("");
    }
  }, [passwordRepeatValue, passwordValue]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const res = await signUp({
      password: passwordValue,
      email: emailValue,
    });
    if (res instanceof UserAlreadyExists) {
      setError("User already exists");
    } else if (res instanceof UnhandledError) {
      setError("Something went wrong :(");
    } else {
      alert("success");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign up</h2>
      {isLoading && <Loader />}
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
        <Input
          type="password"
          value={passwordValue}
          onChange={(v) => setPasswordValue(v)}
          placeholder="password"
          name="password"
          autoComplete="password"
          className={styles.passwordInput}
          required={true}
          isError={Boolean(error)}
          onFocus={() => setError("")}
        />
        <Input
          type="password"
          value={passwordRepeatValue}
          onChange={(v) => setPasswordRepeatValue(v)}
          placeholder="repeat password"
          name="passwordRepeat"
          required={true}
          inputRef={repeatPasswordInputRef}
          isError={Boolean(error)}
          onFocus={() => setError("")}
        />
        <ErrorText text={error} className={styles.errorText} />
        <Checkbox
          value={isAgreementChecked}
          onChange={setIsAgreementChecked}
          text="By clicking sign up, I agree to the privacy policy and processing of the personal data."
          className={styles.agreement}
        />
        <Button
          className={styles.submitButton}
          type="submit"
          isDisabled={!isAgreementChecked}
        >
          Sign up
        </Button>
      </form>
      <div className={styles.footer}>
        <span className={styles.footerText}>Already registered?</span>
        <Link onClick={() => onFormChange("logIn")}>Log in</Link>
      </div>
    </div>
  );
};
