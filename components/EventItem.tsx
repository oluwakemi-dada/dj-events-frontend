import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';
import { Event } from 'types';
import { API_URL } from '../config';

const EventItem: FC<{ evt: Event }> = ({ evt }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.image
              ? `${API_URL}${evt.image.formats.thumbnail.url}`
              : '/images/event-default.png'
          }
          width={170}
          height={100}
          alt=''
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
