UPDATE photos.collection
SET 
    "desc" = 'Welcome to our NYC Album: A Chronicle of Home. Explore a visual journey through the vibrant streets, iconic landmarks, and cherished moments captured within the bustling cityscape of New York City. Each photo encapsulates the essence of my 21-year journey, offering a glimpse into the heart of the city I call home. Join me as we stroll through the familiar sights and hidden gems that have shaped my life and experiences in this dynamic metropolis.',
    colors = '{"textColor": "#FF6600", "shadowColor": "#003884"}'::JSONB
WHERE id = 'collection-1';
