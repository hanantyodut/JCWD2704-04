'use client';
import Link from 'next/link';
import BackEndForm from './backEndForm';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/_lib/redux/hooks';
import { userDataAction } from '@/app/_lib/redux/slices/userData.slice';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState({});
  function inputHandler(e: ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.id]: e.target.value });
  }
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <BackEndForm
          data={input}
          action="/user/v2"
          method="post"
          onSuccess={(response) => {
            dispatch(userDataAction.loginUser(response.data.data));
            router.push('/');
          }}
          onFail={(err) => {
            alert('Login Fail');
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded mt-2"
              onChange={inputHandler}
              required
            />
          </div>
          <input
            value={'Login'}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          />
        </BackEndForm>
        <div className="mt-4 text-center">
          <p>
            Don&lsquo;t have an account?{' '}
            <Link href="/register" legacyBehavior>
              <a className="text-blue-500">Register</a>
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p>
            <Link href="/forgot" legacyBehavior>
              <a className="text-blue-500">Forgot Password?</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
