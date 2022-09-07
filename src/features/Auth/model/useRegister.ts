import { useState } from "react";
import { signUp } from "../api";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    setIsLoading(true);
    const result = await signUp({ password, email });
    setIsLoading(false);

    return result;
  };

  return {
    isLoading,
    signUp: handleSignUp,
  };
};
