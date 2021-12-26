import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { FC } from 'react';
import Link from 'next/link';
import Search from './Search';
import { connect } from 'react-redux';
import { login, logout } from '../store/actions/auth';
import styles from '@/styles/Header.module.css';

const Header: FC = ({ user, logout }) => {
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
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
