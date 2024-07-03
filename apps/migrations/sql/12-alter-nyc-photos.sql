-- Migration Script to update collection field in photos table

BEGIN;

-- Update the collection field from 'NYC' to 'nyc'
UPDATE photos.photo
SET collection = 'nyc'
WHERE collection = 'NYC';

COMMIT;