import { FaSignInAlt } from 'react-icons/fa';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Search from './Search';
import { logout } from '../store/actions/auth';
import styles from '@/styles/Header.module.css';
import { AppDispatch } from '../store';
import { ReduxState } from '../types/index';

const Header: FC = () => {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: ReduxState) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <>
              <li>
                <Link href='/events/add'>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button onClick={onLogout} className='btn-secondary btn-icon'>
                  <FaSignInAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    {' '}
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
