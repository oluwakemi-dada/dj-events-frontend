import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { FC } from 'react';
import Link from 'next/link';
import Search from './Search';
import styles from '@/styles/Header.module.css';

const Header: FC = () => {
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
          <li>
            <Link href='/events/add'>
              <a>Add Event</a>
            </Link>
          </li>
          <li>
            <Link href='/account/login'>
              <a className='btn-secondary btn-icon'>
                {' '}
                <FaSignInAlt /> Login
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
