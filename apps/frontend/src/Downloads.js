import React, { useState } from "react";
import "./css/Downloads.css";
import { usePhotos } from "@film/photos-web";

function Downloads() {
  //   const { collections, homePhotos } = usePhotos();
  //   console.log(collections);
  const { collections, homePhotos } = usePhotos();
  console.log(homePhotos);

  const [selectedAlbum, setSelectedAlbum] = useState("All");

  // Function to handle album selection
  const handleAlbumSelect = (albumName) => {
    setSelectedAlbum(albumName);
  };

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Function to handle when a photo is clicked
  const handlePhotoClick = (pic) => {
    setSelectedPhoto(pic);
  };

  return (
    <div className="downloadsPage">
      <div className="leftSide">
        <h1 className="downloadHeader">Downloads</h1>
        <p className="downloadDesc">
          Easily download any pictures you've seen on the website. Simply browse
          through the gallery, select a picture, and download.
        </p>
        <div className="box">
          {selectedPhoto && (
            <div
              style={{ backgroundImage: `url(${selectedPhoto.image_url})` }}
              className="selectedImage"
            ></div>
          )}
        </div>
      </div>
      <div className="rightSide">
        {homePhotos.map((pic) => (
          <div
            key={pic.id}
            className="picContainer"
            onClick={() => handlePhotoClick(pic)}
          >
            <div
              style={{ backgroundImage: `url(${pic.image_url})` }}
              className="picImage"
            ></div>
          </div>
        ))}
      </div>
      <div className="dropdown">
        <select
          value={selectedAlbum}
          onChange={(e) => handleAlbumSelect(e.target.value)}
        >
          <option value="All">All Albums</option>
          {collections.map((album) => (
            <option key={album.id} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Downloads;

{
  /* <div
          className="picBox"
          style={{
            backgroundImage: `url(${homePhotos[1].image_url})`,
          }}
        ></div> */
}
