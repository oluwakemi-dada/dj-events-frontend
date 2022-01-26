import type { NextPage } from 'next';
import { FaUser } from 'react-icons/fa';
import { useRouter, NextRouter } from 'next/router';
import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/actions/auth';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import { AppDispatch } from 'store';
import { ReduxState } from '../../types/index';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router: NextRouter = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const error = useSelector((state: ReduxState) => state.auth.error);
  const isAuthenticated = useSelector(
    (state: ReduxState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    router.push('/account/dashboard');
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Login' className='btn' />
        </form>

        <p>
          Don&apos;t have an account?
          <Link href='/account/register'> Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
