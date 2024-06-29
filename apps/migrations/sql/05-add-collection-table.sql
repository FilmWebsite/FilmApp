-- Ensure the schema exists before attempting to create the table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'photos') THEN
        CREATE SCHEMA photos;
    END IF;
END $$;

-- Function to generate a new collection ID
CREATE OR REPLACE FUNCTION generate_collection()
RETURNS VARCHAR(255) AS $$
DECLARE
    prefix VARCHAR(255) := 'collection-';
    count_id INTEGER;
    new_id VARCHAR(255);
BEGIN
    SELECT COUNT(*) INTO count_id FROM photos.collection;
    new_id := prefix || count_id + 1;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS photos.collection (
    name VARCHAR(255) NOT NULL,
    id VARCHAR(255) PRIMARY KEY, 
    cover VARCHAR(255) NOT NULL,
    ref VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Function for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp_photo()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update the timestamp on update
CREATE TRIGGER update_collection_timestamp
BEFORE UPDATE ON photos.collection
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_photo();

-- Function to set the custom ID when inserting new records
CREATE OR REPLACE FUNCTION set_collection_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.id := generate_collection();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to set the collection ID before insert
CREATE TRIGGER set_photo_collection_trigger
BEFORE INSERT ON photos.collection
FOR EACH ROW
EXECUTE FUNCTION set_collection_id();
