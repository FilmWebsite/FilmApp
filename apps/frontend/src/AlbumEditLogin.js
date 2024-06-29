import React, { useState, useEffect } from "react";
import "./css/AlbumEditLogin.css";
import passwordImgOne from "./pics/passwordImgOne.jpeg";

function AlbumEditLogin() {
  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${passwordImgOne})`,
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
