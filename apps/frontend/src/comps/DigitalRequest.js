import React, { useState } from "react";
import "../css/DigitalRequest.css";
import { color } from "framer-motion";

const DigitalRequest = () => {
  const [fullName, setFullName] = useState("");
  const [requestedPictures, setRequestedPictures] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
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
    <div className="form">
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
      {/* <h1 className="formNames" style={{ color: "#ff7f50" }}>
        Message:
      </h1>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your message"
      /> */}

      {errorMessage && <p className="error">{errorMessage}</p>}
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </div>
  );
};

export default DigitalRequest;
