import React, { useState } from "react";
import "../css/DigitalRequest.css";

const PhysicalRequest = () => {
  const [fullName, setFullName] = useState("");
  const [requestedPictures, setRequestedPictures] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleRequestedPicturesChange = (event) => {
    setRequestedPictures(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setErrorMessage("");
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
    setErrorMessage("");
  };

  const handleCity = (event) => {
    setCity(event.target.value);
    setErrorMessage("");
  };

  const handleState = (event) => {
    setState(event.target.value);
    setErrorMessage("");
  };

  const handleZipCode = (event) => {
    setZipCode(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email && !phoneNumber) {
      setErrorMessage(
        "Please enter either an email address or a phone number."
      );
      return;
    }
    // Handle form submission
  };

  return (
    <form className="form">
      <h1 className="formNames" style={{ color: "white" }}>
        Full Name:
      </h1>
      <input
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        className="formInput"
      />
      <h1 className="formNames" style={{ color: "white" }}>
        Requested Pictures:
      </h1>

      <h1 className="formNames" style={{ color: "white" }}>
        Picture Size:
      </h1>

      <h1 className="formNames" style={{ color: "white" }}>
        Email:
      </h1>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className="formInput"
      />
      <h1 className="formNames" style={{ color: "white" }}>
        Phone Number:
      </h1>
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="formInput"
      />

      <h1 className="formNames" style={{ color: "white" }}>
        Address:
      </h1>
      <input
        type="text"
        value={address}
        onChange={handleAddress}
        className="formInput"
      />
      <h1 className="formNames" style={{ color: "white" }}>
        City:
      </h1>
      <input
        type="text"
        value={city}
        onChange={handleCity}
        className="formInput"
      />
      <h1 className="formNames" style={{ color: "white" }}>
        State:
      </h1>
      <input
        type="text"
        value={state}
        onChange={handleState}
        className="formInput"
      />
      <h1 className="formNames" style={{ color: "white" }}>
        Zip Code:
      </h1>
      <input
        type="text"
        value={zipCode}
        onChange={handleZipCode}
        className="formInput"
      />

      {errorMessage && <p className="error">{errorMessage}</p>}
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </form>
  );
};

export default PhysicalRequest;
