import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Spinner from "../components/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="mt-14">
      <div className="flex flex-col max-w-xl mx-auto border border-zinc-300 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-[25px]">Login</h1>
          <h1 className="font-medium text-[20px] text-zinc-500">TaskFroge</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <p className="text-zinc-500">Email</p>
          <input
            type="email"
            className="border border-zinc-300 rounded-md mb-5 h-8 pl-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="text-zinc-500">Password</p>
          <input
            type="password"
            className="border border-zinc-300 rounded-md mb-5 h-8 pl-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            className="px-4 py-2 border bg-blue-500 text-white font-medium rounded-md flex justify-center gap-4"
            disabled={isLoading}
          >
            {isLoading && <Spinner />}Login
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
