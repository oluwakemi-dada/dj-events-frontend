import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import { Event } from 'types';

const EventsPage: NextPage<{ events: Event[] }> = ({ events }) => {
  return (
    <Layout>
      <h1> Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
};

export default EventsPage;

export const getStaticProps = async () => {
  const res: Response = await fetch(`${API_URL}/api/events`);

  const events: Event[] = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
};
