import { useState } from "react";
import { restorePassword } from "../api";

export const useRestorePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRestorePassword = async ({ email }: { email: string }) => {
    setIsLoading(true);
    const result = await restorePassword({ email });

    setIsLoading(false);

    return result;
  };

  return {
    isLoading,
    restorePassword: handleRestorePassword,
  };
};
