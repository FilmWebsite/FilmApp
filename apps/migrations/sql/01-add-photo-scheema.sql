-- Schema
CREATE SCHEMA IF NOT EXISTS photos;

-- Function to generate custom IDs like "film-1", "film-2", etc.
CREATE OR REPLACE FUNCTION generate_store_id()
RETURNS VARCHAR(255) AS $$
DECLARE
    prefix VARCHAR(255) := 'film-';
    count_id INTEGER;
    new_id VARCHAR(255);
BEGIN
    SELECT COUNT(*) INTO count_id FROM photos.photo;
    new_id := prefix || count_id + 1;
    RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Migration for adding photo table
CREATE TABLE IF NOT EXISTS photos.photo (
    id VARCHAR(255) PRIMARY KEY, 
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Migration for updating timestamps using the provided function
CREATE OR REPLACE FUNCTION update_timestamp_photo()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the timestamp update trigger to the "photo" table
CREATE TRIGGER update_photo_timestamp
BEFORE UPDATE ON photos.photo
FOR EACH ROW
EXECUTE FUNCTION update_timestamp_photo();

-- Create a trigger to automatically set the custom ID when inserting new records
CREATE OR REPLACE FUNCTION set_photo_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.id := generate_store_id();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_photo_id_trigger
BEFORE INSERT ON photos.photo
FOR EACH ROW
EXECUTE FUNCTION set_photo_id();
