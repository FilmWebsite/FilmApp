import { CollectionType } from '@film/photos-iso';
import { useEffect, useState, useCallback } from 'react';

type HomeDisplaySwapUrls = {
  oldUrl: string;
  newUrl: string;
};
const sendHomeDisplayRequest = async ({
  oldUrl,
  newUrl,
}: HomeDisplaySwapUrls) => {
  try {
    const response = await fetch('http://localhost:8080/admin/update/display', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: {
          oldUrl: oldUrl,
          newUrl: newUrl,
        },
      }),
    });
    if (!response.ok) {
      alert('Home Display Swap Failed');
    }
  } catch (error) {
    throw new error();
  }
};

const sendCollectionCoverRequest = async ({
  image,
  ref,
}: {
  image: File;
  ref: CollectionType;
}) => {
  try {
    const formData = new FormData();
    formData.append('imageFile', image); // Append the file to the FormData
    formData.append('ref', ref); // Append the file to the FormData

    const response = await fetch(
      'http://localhost:8080/admin/update/collection/cover',
      {
        method: 'POST',
        body: formData, // Use FormData for file uploads
      }
    );

    if (!response.ok) {
      alert('Collection Cover Failed');
    } else {
      const result = await response.json(); // Optional: Process the backend response
      console.log('Upload successful:', result);
    }
  } catch (error) {
    console.error('Error uploading collection cover:', error);
    throw error;
  }
};

export function useAdminTools() {
  const swapHomeDisplay = async (urls: HomeDisplaySwapUrls) => {
    const { oldUrl, newUrl } = urls;
    try {
      await sendHomeDisplayRequest({
        oldUrl,
        newUrl,
      });
    } catch (e) {
      console.log('error from admin actions');
    }
  };

  const collectionCoverChange = async (image: File, ref: CollectionType) => {
    try {
      await sendCollectionCoverRequest({
        image,
        ref,
      });
    } catch (e) {
      console.log('error from admin actions');
    }
  };

  return {
    swapHomeDisplay: swapHomeDisplay,
    collectionCoverChange: collectionCoverChange,
  };
}
