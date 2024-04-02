import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSingup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const singup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    if (!username) {
      setError("Fill username");
      setIsLoading(false);
      return;
    }

    const res = await fetch("https://app-api-sable.vercel.app/api/user/singup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { singup, isLoading, error };
};
