import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { API_URL } from '@/config/index';
import { ImageUploadProps } from '../types';
import styles from '@/styles/Form.module.css';

const ImageUpload: FC<ImageUploadProps> = ({ evtId, imageUploaded, token }) => {
  const [image, setImage] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
};

export default ImageUpload;
