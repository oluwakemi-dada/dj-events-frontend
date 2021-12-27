import type { NextPage } from 'next';
import { FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useState, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/actions/auth';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import { LoginUser, AppState } from '../../types';

const LoginPage: NextPage<{
  login: LoginUser;
  error: string;
  isAuthenticated: boolean;
}> = ({ login, error, isAuthenticated }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
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
          Don`&apos;`t have an account?
          <Link href='/account/register'> Register</Link>
        </p>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
