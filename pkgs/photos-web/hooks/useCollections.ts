import { useEffect, useState, useCallback } from 'react';
import { CollectionType } from '@film/photos-iso';

const validCollections = ['NYC', 'landmarks', 'qt', 'grenada'];

export function useCollection(collection: CollectionType) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollectionDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/collections/${collection}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Assuming you might need to send some data with the POST request:
          // body: JSON.stringify({ /* your data object here */ }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    fetchCollectionDetails();
  }, [fetchCollectionDetails]);

  return { data, loading, error };
}
