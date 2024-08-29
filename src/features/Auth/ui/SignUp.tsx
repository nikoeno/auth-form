import React, { useEffect, useRef, useState } from "react";

import { UnhandledError, UserAlreadyExists } from "src/shared/errors";
import { Button } from "src/shared/ui/Button";
import { Checkbox } from "src/shared/ui/Checkbox";
import { ErrorText } from "src/shared/ui/ErrorText";
import { Input } from "src/shared/ui/Input";
import { Link } from "src/shared/ui/Link";
import { Loader } from "src/shared/ui/Loader";

import { useSignUp } from "../model/useSignUp";
import { AUTH_FORMS_TYPES, AGREEMENT_MUST_BE_CHECKED_ERROR } from "./constants";

import styles from "./SignUp.module.css";

export const SignUp = () => {
  const [isAgreementChecked, setIsAgreementChecked] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [agreementValidationError, setAgreementValidationError] =
    useState(false);

  const { signUp, isLoading } = useSignUp();

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

    if (!isAgreementChecked) {
      setAgreementValidationError(true);

      return;
    }

    const res = await signUp({
      password: passwordValue,
      email: emailValue,
    });

    if (res instanceof UserAlreadyExists) {
      setSignUpError("User already exists");
    } else if (res instanceof UnhandledError) {
      setSignUpError("Something went wrong :(");
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
          onChange={setEmailValue}
          placeholder="email"
          name="email"
          focusOnMount={true}
          autoComplete="email"
          className={styles.emailInput}
          required={true}
          isError={Boolean(signUpError)}
          onFocus={() => setSignUpError("")}
        />
        <Input
          type="password"
          value={passwordValue}
          onChange={setPasswordValue}
          placeholder="password"
          name="password"
          autoComplete="password"
          className={styles.passwordInput}
          required={true}
          isError={Boolean(signUpError)}
          onFocus={() => setSignUpError("")}
        />
        <Input
          type="password"
          value={passwordRepeatValue}
          onChange={setPasswordRepeatValue}
          placeholder="repeat password"
          name="passwordRepeat"
          required={true}
          inputRef={repeatPasswordInputRef}
          isError={Boolean(signUpError)}
          onFocus={() => setSignUpError("")}
        />
        <ErrorText text={signUpError} className={styles.errorText} />
        <Checkbox
          value={isAgreementChecked}
          onChange={setIsAgreementChecked}
          text="By clicking sign up, I agree to the privacy policy and processing of the personal data."
          className={styles.agreement}
          error={
            agreementValidationError
              ? AGREEMENT_MUST_BE_CHECKED_ERROR
              : undefined
          }
        />
        <Button className={styles.submitButton} type="submit">
          Sign up
        </Button>
      </form>
      <div className={styles.footer}>
        <span className={styles.footerText}>Already registered?</span>
        <Link to={`/?form=${AUTH_FORMS_TYPES.logIn}`}>Log in</Link>
      </div>
    </div>
  );
};
