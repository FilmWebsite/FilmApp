import React, { useState } from 'react';
import './scss/FindMe.css';
import axios from 'axios';

const FindMe: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResults, setDetectionResults] = useState<any[]>([]);

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

      setDetectionResults(response.data.results || []);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='page'>
      <div className='page-child'>
        <h1 className='nameOfPage'>Find Me</h1>
        <p className='desc'>
          Easily download any pictures you're seen in on the website. Upload a
          clear selfie, and let us do the rest.
        </p>

        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='find-me-input'
        />

        <button onClick={handleUpload} disabled={!selectedFile || isLoading}>
          {isLoading ? 'Uploading...' : 'Upload and Detect'}
        </button>

        {detectionResults.length > 0 && (
          <div className='detection-results'>
            <h3>Detection Results</h3>
            {detectionResults.map((result, index) => (
              <div key={index}>
                <p>Photo URL: {result.photoUrl}</p>
                <p>Best Match: {result.bestMatch.toString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { FindMe };
