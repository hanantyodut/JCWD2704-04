"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import BackEndForm from "./backEndForm";

const LupaPasswordForm: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({ email: "" });

  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Forget Password</h2>
        <BackEndForm
          data={input}
          action="/user/forgot"
          method="post"
          onSuccess={() => {
            alert("Please check your email to reset your password");
            router.push("/login");
          }}
          onFail={() => {
            alert("Failed to send password reset email");
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <input
            value="Reset Password"
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          />
        </BackEndForm>
      </div>
    </div>
  );
};

export default LupaPasswordForm;
