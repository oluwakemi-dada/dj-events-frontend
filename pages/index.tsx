import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { Event } from 'types';

const HomePage: NextPage<{ events: Event[] }> = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      { events.length !== 0 && events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      
      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const res: Response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);

  const events: Event[] = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
};
