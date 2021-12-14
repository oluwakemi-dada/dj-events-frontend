import { FC } from 'react';
import Head from 'next/head';
import { useRouter, NextRouter } from 'next/router';
import { LayoutProps } from '../types';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';

const Layout: FC<LayoutProps> = ({
  title,
  keywords,
  description,
  children,
}) => {
  const router: NextRouter = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ in other musical events',
  keywords: 'music, dj, edm, events',
};

export default Layout;
