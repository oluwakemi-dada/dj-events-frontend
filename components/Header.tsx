import { FaSignInAlt } from 'react-icons/fa';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import Search from './Search';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import styles from '@/styles/Header.module.css';
import { UserData, LogoutUser, AppState } from '../types';

const Header: FC<{ user: UserData; logout: LogoutUser }> = ({
  user,
  logout,
}) => {
  const router: NextRouter = useRouter();

  const onLogout = () => {
    logout();
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

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
