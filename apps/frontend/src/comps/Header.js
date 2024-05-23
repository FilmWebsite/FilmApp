import React, { useEffect } from "react";
import "../css/Header.css"; // Import CSS file

const Header = ({ album }) => {
  useEffect(() => {
    const text = document.getElementById("text");
    let textColor = "#000000"; // Default text color
    let shadowColor = "#d9d9d9"; // Default shadow color

    // Change text color and shadow color based on album name
    if (album === "Howard University") {
      textColor = "#E51937"; // Change text color for Howard University
      shadowColor = "#003A63"; // Change shadow color for Howard University
    } else if (album === "New York City") {
      textColor = "#FF6600"; // Change text color for New York City
      shadowColor = "#003884"; // Change shadow color for New York City
    } else if (album === "Quick Trips") {
      textColor = "#eed543"; // Change text color for Quick Trips
      shadowColor = "#cc641e"; // Change shadow color for Quick Trips
    } else if (album === "Land Marks") {
      textColor = "#c7c3bb"; // Change text color for Quick Trips
      shadowColor = "#746854"; // Change shadow color for Quick Trips
    } else if (album === "Grenada") {
      textColor = "#009739"; // Change text color for Quick Trips
      shadowColor = "#FFD100"; // Change shadow color for Quick Trips
    }

    let shadow = "";
    for (let i = 0; i < 12; i += 1) {
      shadow += `${shadow ? "," : ""}${-i * 1 + "px"} ${
        i * 1 + "px"
      } 0 ${shadowColor}`;
    }
    text.style.textShadow = shadow;
    text.style.color = textColor;
  }, [album]);

  useEffect(() => {
    const text = document.getElementById("text");
    const dataText = text.getAttribute("data-text"); // Get the value of data-text attribute
    text.dataset.text = dataText; // Set the value of data-text attribute to dataset.text
  }, []);

  return (
    <div className="textBody">
      <div id="text">{album}</div>
    </div>
  );
};

export { Header };

// #ff7f50, #fd5e53, #f94e63, #d2386c
