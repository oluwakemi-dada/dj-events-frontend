import { FC } from 'react';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

const Footer: FC = () => {
  const d: Date = new Date();
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events {d.getFullYear()}</p>
      <p>
        <Link href='/about'>About This Project</Link>
      </p>
    </footer>
  );
};

export default Footer;
