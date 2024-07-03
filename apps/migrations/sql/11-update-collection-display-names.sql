-- Add a column 'display_name' to the 'collection' table if it doesn't exist
ALTER TABLE photos.collection
ADD COLUMN IF NOT EXISTS display_name VARCHAR(255);

-- Update the 'display_name' for specific rows in the 'collection' table
UPDATE photos.collection
SET display_name = 'Howard University'
WHERE id = 'collection-2';

UPDATE photos.collection
SET display_name = 'New York City'
WHERE id = 'collection-1';

-- Update the 'ref' for a specific row in the 'collection' table
UPDATE photos.collection
SET ref = 'nyc'
WHERE id = 'collection-1';
