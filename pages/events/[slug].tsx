import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import { Event } from 'types';
import styles from '@/styles/Event.module.css';

const EventPage: NextPage<{ evt: Event }> = ({ evt }) => {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image && (
          <div className={styles.image}>
            <Image
              src={`http://localhost:1337${evt.image.formats.medium.url}`}
              width={960}
              height={600}
              alt=''
            />
          </div>
        )}

        <h3>Performers: </h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt: Event) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
};

// export const getServerSideProps = async ({ query: { slug } }) => {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// };
