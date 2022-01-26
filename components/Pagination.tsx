import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

interface PaginationProps {
  page: number;
  total: number;
}

const Pagination: FC<PaginationProps> = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <Fragment>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </Fragment>
  );
};

export default Pagination;
