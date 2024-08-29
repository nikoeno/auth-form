export const AUTH_FORMS_TYPES = {
  logIn: "log-in",
  signUp: "sign-up",
  restorePassword: "restore-password",
} as const;

type AuthFormTypesKeys = keyof typeof AUTH_FORMS_TYPES;

export type AuthFormTypesValues = (typeof AUTH_FORMS_TYPES)[AuthFormTypesKeys];

export const AGREEMENT_MUST_BE_CHECKED_ERROR =
  "You cant sign up without accepting our privacy policy";
