import { useEffect, useState, useCallback } from 'react';
import { Collection } from '@film/photos-iso';

type EditAction = {
  id: string;
  data: Collection;
};

const sendEditRequest = async (data: EditAction) => {
  try {
    const response = await fetch(
      'http://localhost:8080/admin/edit/collection',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      alert('Error edititng collection.');
    }
  } catch (error) {
    throw new error();
  }
};

export function useAdminActions() {
  const editCollection = async (props: EditAction) => {
    const { id, data } = props;

    try {
      await sendEditRequest({
        id,
        data,
      });
    } catch (e) {
      console.log('error from admin actions');
    }
  };

  return {
    editCollection,
  };
}
