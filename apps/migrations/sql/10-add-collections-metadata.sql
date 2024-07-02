UPDATE photos.collection
SET 
    "desc" = 'Welcome to our Howard University Album: A Journey Through Time. Embark on a visual exploration spanning from my sophomore year to the present day. Each picture holds a piece of the story, capturing the essence of my journey through Howard University. From the bustling campus life to the moments of quiet reflection, this album offers a glimpse into the heart of my university experience. Let these pictures take you on a journey through the vibrant campus life, iconic landmarks, and unforgettable moments that have made my time at Howard University truly unforgettable.',
    colors = '{"textColor": "#E51937", "shadowColor": "#003A63"}'::JSONB
WHERE id = 'collection-2';

UPDATE photos.collection
SET 
    "desc" = 'A Journey Back to Roots. Embark on a visual exploration of my recent trip to my mother''s homeland, Grenada, captured in December of 2023. Each photograph in this album serves as a memoir of my third visit to this beautiful country, brimming with rich culture and unforgettable experiences. From the tranquil shores to the lush landscapes, this album chronicles the moments spent reconnecting with family, embracing local traditions, and immersing myself in the vibrant tapestry of Grenadian life. Join me as we traverse through the enchanting streets, iconic landmarks, and cherished memories of Grenada. Together, let''s embark on a journey of discovery, where every photograph tells a story and every moment is etched in the heart.',
    colors = '{"textColor": "#009739", "shadowColor": "#FFD100"}'::JSONB
WHERE id = 'collection-3';

UPDATE photos.collection
SET 
    "desc" = 'Welcome to our Landmarks Album: A Tapestry of Treasured Sites. Step into a visual odyssey through a diverse array of iconic landmarks, spanning from the bustling streets of New York City to the serene landscapes of Rock Creek Park in Washington, D.C. This album offers a curated collection of snapshots, each capturing the essence and allure of these renowned destinations. From the towering skyscrapers of Manhattan to the historic monuments of the nation''s capital, join me on a journey through time and space as we explore these cherished sites. Whether it''s the vibrant energy of Times Square or the tranquil trails of Rock Creek Park, each photograph tells a unique story, inviting you to immerse yourself in the rich tapestry of human history and natural beauty.',
    colors = '{"textColor": "#c7c3bb", "shadowColor": "#746854"}'::JSONB
WHERE id = 'collection-4';

UPDATE photos.collection
SET 
    "desc" = 'Embark on a visual expedition through the heart of adventure, capturing moments from our unforgettable road trips to destinations like the Jersey Shore, the vibrant streets of New York City, and the quaint charm of Zack''s Taco Shop in the Poconos. Each photograph in this album tells a story of exploration and spontaneity, as we traverse highways and byways in search of new experiences and hidden gems. So buckle up and get ready to hit the road with us once again, as we revisit the unforgettable moments from our road trips to the Jersey Shore, New York City, and Zack''s Taco Shop in the Poconos. Welcome to our Road Trips Album: A Journey of Discovery.',
    colors = '{"textColor": "#eed543", "shadowColor": "#cc641e"}'::JSONB
WHERE id = 'collection-5';
