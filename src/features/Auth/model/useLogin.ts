import { useState } from "react";
import { logIn } from "../api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    setIsLoading(true);
    const result = await logIn({ password, email });

    setIsLoading(false);

    return result;
  };

  return {
    isLoading,
    logIn: handleLogIn,
  };
};
