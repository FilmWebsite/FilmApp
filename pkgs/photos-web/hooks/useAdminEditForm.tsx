import { Collection, CollectionFormData } from '@film/photos-iso';
import { useEffect, useState, useCallback } from 'react';

export function useAdminCollectionForm(collection: Collection) {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const [formData, setFormData] = useState<CollectionFormData>({
    card_name: null,
    text_color: null,
    shadow_color: null,
    display_name: null,
    desc: null,
  });

  const getChangedFields = (originalData: Collection) => {
    let changedFields: Partial<CollectionFormData> = {};

    for (const key in formData) {
      const fieldKey = key as keyof CollectionFormData;
      let newValue = formData[fieldKey];

      let originalValue;
      if (fieldKey === 'text_color') {
        originalValue = originalData.colors.textColor;
      } else if (fieldKey === 'shadow_color') {
        originalValue = originalData.colors.shadowColor;
      } else {
        originalValue = originalData[fieldKey as keyof Collection];
      }

      // If the new value is empty, revert to the original and ignore as a change
      if (newValue === '') {
        newValue = originalValue;
      }

      if (newValue !== null && newValue !== originalValue) {
        changedFields[fieldKey] = newValue;
      }
    }

    return changedFields;
  };

  const handleFormChange = (name: keyof CollectionFormData, val: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: val }));
  };

  useEffect(() => {
    const changedFields = getChangedFields(collection);
    setIsEdited(Object.keys(changedFields).length > 0);
  }, [formData, collection]);

  const submit = useCallback(
    async (token: string) => {
      const changedFields = getChangedFields(collection);

      try {
        const response = await fetch(
          'http://localhost:8080/admin/update/collection/form-data',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              editedData: changedFields,
              ref: collection.ref,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log('Update successful:', data);
        } else {
          console.error('Update failed:', data.error);
        }
      } catch (error) {
        console.error('Error submitting changes:', error);
      }
    },
    [getChangedFields, collection]
  );

  return {
    submitCollectionEdit: submit,
    handleFormChange,
    isEdited,
  };
}
