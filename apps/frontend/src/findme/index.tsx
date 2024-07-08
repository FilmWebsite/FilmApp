import React, { useState } from 'react';
import './scss/FindMe.css';
import axios from 'axios';
import { Preloader, TailSpin } from 'react-preloader-icon';
import { useNavigate } from 'react-router-dom';

const FindMe: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any[]>([]);
  const [didResultsReturn, setDidResultsReturn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post(
        'http://localhost:8080/upload-image-for-processing',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate('/detection/results', {
        state: { results: response.data || [] },
      });

      setDidResultsReturn(true);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='page'>
        <div className='page-child'>
          <div className='page-header'>
            <h1 className='nameOfPage'>Find Me</h1>

            <p className='desc'>
              Have you been featured on the website? <br />
              Upload a selfie and we'll find all the photos of you
            </p>

            <div className='guidelines'>
              <p>
                For best resutls please upload a clear selfie with only yourself
                in the picture
              </p>
            </div>
          </div>

          {!isLoading && !didResultsReturn && (
            <>
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='find-me-input'
              />
            </>
          )}

          {!isLoading && !didResultsReturn && (
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className='upload-bttn'
            >
              Find Me
            </button>
          )}

          {isLoading && (
            <Preloader
              use={TailSpin}
              size={60}
              strokeWidth={6}
              strokeColor='#fd5e53'
              duration={900}
              className='loader'
            />
          )}
        </div>
      </div>
    </>
  );
};

export { FindMe };
