import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { useRouter, NextRouter } from 'next/router';
import { parseCookies } from 'helpers';
import { Http2ServerRequest } from 'http2';
import { Event } from '../../types/index';
import DashboardEvent from '@/components/DashboardEvent';
import styles from '@/styles/Dashboard.module.css';

interface DashboardPageProps {
  events: Event[];
  token: string;
}

const DashboardPage: NextPage<DashboardPageProps> = ({ events, token }) => {
  const router: NextRouter = useRouter();

  const deleteEvent = async (id: number) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <ToastContainer />
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

interface ServerSidePropsTypes {
  req: Http2ServerRequest;
}

export const getServerSideProps = async ({ req }: ServerSidePropsTypes) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events, token },
  };
};
