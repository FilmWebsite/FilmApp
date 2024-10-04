import React, { useState } from 'react';
import '../css/Downloads.css';

const ImageDownloader = ({ selectedPhoto }) => {
  const [loading, setLoading] = useState(false);

  const downloadImage = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/download/`, {
        method: 'POST', // Changed to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
        }), // Sending body data as JSON
      });
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);

      // Create an anchor element and trigger download
      const anchor = document.createElement('a');
      anchor.style.display = 'none';
      anchor.href = blobURL;
      anchor.download = 'downloaded-image.png';
      document.body.appendChild(anchor);
      anchor.click();
      URL.revokeObjectURL(blobURL);
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('Failed to download image', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => downloadImage(selectedPhoto.url)}
      disabled={loading}
      className={`download-button ${loading ? 'loading' : 'not-loading'}`}
    >
      {loading ? 'Downloading...' : 'Download Image'}
    </button>
  );
};

export default ImageDownloader;
