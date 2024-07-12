import React, { useState } from 'react';

const ImageDownloader = ({ selectedPhoto }) => {
  const [loading, setLoading] = useState(false);

  const downloadImage = async (imageId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/download/${imageId}`);
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
    <button onClick={() => downloadImage(selectedPhoto?.id)} disabled={loading}>
      {loading ? 'Downloading...' : 'Download Image'}
    </button>
  );
};

export default ImageDownloader;
