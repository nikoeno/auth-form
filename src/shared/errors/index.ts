export class UserDoesNotExistError extends Error {
  name = "User doesn't exist";
  message = "USED_DOES_NOT_EXIST";
}

export class WrongPasswordError extends Error {
  name = "Wrong password";
  message = "WRONG_PASSWORD";
}

export class UserAlreadyExists extends Error {
  name = "User already exists";
  message = "USER_ALREADY_EXISTS";
}

export class UnhandledError extends Error {
  name = "unhandled error";
  message = "UNHANDLED_ERROR";
}
