import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { Events } from 'types';

const HomePage: NextPage<{ events: Events[] }> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const res: Response = await fetch(`${API_URL}/api/events`);

  const events: Events[] = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
};
