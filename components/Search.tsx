import React, { FC, useState, FormEvent } from 'react';
import { useRouter, NextRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

const Search: FC = () => {
  const [term, setTerm] = useState<string>('');
  const router: NextRouter = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder='Search Events'
        />
      </form>
    </div>
  );
};

export default Search;
