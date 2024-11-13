import { useState } from 'react';
import '../styles/Downloads.scss';
import { Photo } from '@film/photos-iso';

const ImageDownloader = ({
  content,
  type,
}: {
  content?: string[] | Photo;
  type: 'single' | 'multiple';
}) => {
  const [loading, setLoading] = useState(false);

  // FIX FUCNTION TO SUPORT MUTIPLE PHOTOS
  const downloadImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/download/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // url: url,
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

  if (!content) return;

  console.log(content, 'hi');

  return (
    <button
      onClick={() => downloadImage()}
      disabled={loading}
      className={`download-button ${loading ? 'loading' : 'not-loading'}`}
    >
      {loading
        ? 'Downloading...'
        : // @ts-ignore
        type === 'multiple' && content.length > 1
        ? 'Download Images'
        : 'Download Image'}
    </button>
  );
};

export { ImageDownloader };
