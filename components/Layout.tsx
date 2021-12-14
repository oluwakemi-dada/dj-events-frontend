import type { NextPage } from 'next';
import Head from 'next/head';
import { LayoutProps } from '../types';
import styles from '../styles/Layout.module.css';

const Layout: NextPage<LayoutProps> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: 'Find the latest DJ in other musical events',
  keywords: 'music, dj, edm, events',
};

export default Layout;
