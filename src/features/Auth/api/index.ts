import {
  UnhandledError,
  UserAlreadyExists,
  UserDoesNotExistError,
  WrongPasswordError,
} from "src/shared/errors";

const TIMEOUT = 500;

type User = {
  nickname: string;
  email: string;
};

const getMockUser = ({ email }: { email: string }): User => {
  return {
    nickname: email.split("@")[0],
    email,
  };
};

export const logIn = async ({
  password: _,
  email,
}: {
  password: string;
  email: string;
}) => {
  return new Promise<
    User | WrongPasswordError | UserDoesNotExistError | UnhandledError
  >((resolve) => {
    setTimeout(() => {
      if (email.includes("wrongPassword")) {
        resolve(new WrongPasswordError());
      }

      if (email.includes("unregistered")) {
        resolve(new UserDoesNotExistError());
      }

      if (email.includes("unhandledError")) {
        resolve(new UnhandledError());
      }

      resolve(getMockUser({ email }));
    }, TIMEOUT);
  });
};

export const signUp = async ({
  password: _,
  email,
}: {
  password: string;
  email: string;
}) => {
  return new Promise<User | UserAlreadyExists | UnhandledError>((resolve) => {
    setTimeout(() => {
      if (email.includes("alreadyExists")) {
        resolve(new UserAlreadyExists());
      }

      if (email.includes("unhandledError")) {
        resolve(new UnhandledError());
      }

      resolve(getMockUser({ email }));
    }, TIMEOUT);
  });
};

export const restorePassword = async ({ email }: { email: string }) => {
  return new Promise<void | UserDoesNotExistError | UnhandledError>(
    (resolve) => {
      setTimeout(() => {
        if (email.includes("unregistered")) {
          resolve(new UserDoesNotExistError());
        }

        if (email.includes("unhandledError")) {
          resolve(new UnhandledError());
        }

        resolve();
      }, TIMEOUT);
    }
  );
};
