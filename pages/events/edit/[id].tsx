import { parseCookies } from 'helpers';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, FormEvent, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import { useRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import { API_URL } from '@/config/index';
import { formatDateForInput } from '@/utils/formatDate';
import { AddEventForm, EditEventForm } from '../../../types';
import styles from '@/styles/Form.module.css';
import { Http2ServerRequest } from 'http2';

const EditEventPage: NextPage<{
  evt: EditEventForm;
  isAuthenticated: boolean;
  token: string;
}> = ({ evt, token }) => {
  const router: NextRouter = useRouter();

  const [values, setValues] = useState<AddEventForm>({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: formatDateForInput(evt.date),
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    evt.image ? evt.image.formats.thumbnail.url : null
  );

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some(
      (element: string) => element === ''
    );

    if (hasEmptyFields) {
      toast.error('Please fill all fields');
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('Unauthorized');
        return;
      }

      toast.error('Something Went Wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Event' className='btn' />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image
          src={`${API_URL}${imagePreview}`}
          height={100}
          width={170}
          alt=''
        />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button
          className='btn-secondary center'
          onClick={() => setShowModal(true)}
        >
          <FaImage /> <span className={styles.marginLeft}> Set Image</span>
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEventPage;

export const getServerSideProps = async ({
  params: { id },
  req,
}: {
  params: { id: string };
  req: Http2ServerRequest;
}) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/${id}`);

  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
};
