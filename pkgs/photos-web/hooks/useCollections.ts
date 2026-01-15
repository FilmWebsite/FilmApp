import { useEffect, useState, useCallback } from 'react';
import { CollectionType } from '@film/photos-iso';

export function useCollection(collectionId: CollectionType) {
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollectionDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/collections/${collectionId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setCollection(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [collectionId]); // Dependency on collectionId only

  useEffect(() => {
    fetchCollectionDetails();
  }, [fetchCollectionDetails]);

  return { collection, loading, error };
}
