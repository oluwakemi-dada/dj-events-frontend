import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { Event } from 'types';
import styles from '@/styles/Event.module.css';
import { DeleteEvent } from 'types';
import { useRouter, NextRouter } from 'next/router';

const EventPage: NextPage<{ evt: Event }> = ({ evt }) => {
  const router = useRouter();

  const deleteEvent: DeleteEvent = async () => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
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
