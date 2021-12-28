import type { NextPage } from 'next';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, FormEvent } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions/auth';
import { useRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';
import { RegisterUser, AppState } from '../../types';

const RegisterPage: NextPage<{
  register: RegisterUser;
  error: string;
  isAuthenticated: boolean;
}> = ({ register, error, isAuthenticated }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const router: NextRouter = useRouter();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    register({ username, email, password });
  };

  if (isAuthenticated) {
    router.push('/account/dashboard');
  }

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
            <input
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type='submit' value='Register' className='btn' />
        </form>

        <p>
          Already have an account?
          <Link href='/account/login'> Login</Link>
        </p>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: AppState) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(RegisterPage);
