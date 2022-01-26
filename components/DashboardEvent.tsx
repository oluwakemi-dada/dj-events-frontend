import { FC } from 'react';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';
import { Event, DashboardHandleDelete } from '../types/index';

interface DashboardEventProps {
  evt: Event;
  handleDelete: DashboardHandleDelete;
}

const DashboardEvent: FC<DashboardEventProps> = ({ evt, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
          <span className={styles.editText}> Edit</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(evt.id)}
      >
        <FaTimes /> <span className={styles.deleteText}> Delete</span>
      </a>
    </div>
  );
};

export default DashboardEvent;
