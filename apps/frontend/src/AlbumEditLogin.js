import React, { useState, useEffect } from "react";
import "./css/AlbumEditLogin.css";
import { usePhotos } from "@film/photos-web";
// import passwordImgOne from "./pics/passwordImgOne.jpeg";

function AlbumEditLogin() {
  const { collections, homePhotos } = usePhotos();
  console.log(homePhotos);
//   homePhotos[7].image_url}
  return (
    <div
      className="background"
      style={{
        backgroundImage: homePhotos && homePhotos.length > 7 ? `url(${homePhotos[7].image_url})` : ""
          
      }}
    >
      <a className="homeBtn" href="/">
        Home
      </a>
      <div className="blurredBox">
        <div className="passwordContentBox">
          <h1 className="passwordContentHeader">
            Please enter password to edit my albums
          </h1>
          <input type="password" className="password" />
          <a className="enterButton" href="/albums-edit">
            Enter
          </a>
        </div>
      </div>
    </div>
  );
}

export default AlbumEditLogin;
