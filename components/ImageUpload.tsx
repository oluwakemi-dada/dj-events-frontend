import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { API_URL } from '@/config/index';
import { ImageUploadProps } from '../types';
import styles from '@/styles/Form.module.css';

const ImageUpload: FC<ImageUploadProps> = ({ evtId, imageUploaded }) => {
  const [image, setImage] = useState<any | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
    
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);

    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
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
