ALTER TABLE IF EXISTS photos.collection_deleted 
ADD COLUMN description VARCHAR(1000),
ADD COLUMN colors JSONB,
ADD COLUMN display_name VARCHAR(255);
