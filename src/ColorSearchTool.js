import React, { useState, useEffect } from "react";
import "./ColorSearchTool.css";

const ColorSearchTool = () => {
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch colors from the JSON file --> Beacuse Given api is not working so that i can create and use
    // https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json

    fetch("/colors.json")
      .then((response) => response.json())
      .then((data) => {
        setColors(data);
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  useEffect(() => {
    const formattedSearchTerm = searchTerm.toLowerCase();
    const filteredColors = colors.filter(
      (color) =>
        color.hex.toLowerCase().includes(formattedSearchTerm) ||
        color.color.toLowerCase().includes(formattedSearchTerm)
    );

    setSearchResults(filteredColors);
    if (filteredColors.length === 0 && searchTerm.trim() !== "") {
      setErrorMessage(" !! No matching colors found !!");
    } else {
      setErrorMessage("");
    }
  }, [searchTerm, colors]);

  return (
    <div className="container">
      <input
        className="input_text"
        type="text"
        placeholder="Enter  Colour"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {searchResults.length > 0 && (
        <div className="scroll">
            <table className="color-table">
          <thead>
            <tr>
              <th></th>
              <th>Color Name</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((color) => (
              <tr key={color.hex}>
                <td>
                  <div
                    className="color-name"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span>Color</span>
                  </div>
                </td>
                <td className="color_name">{color.color}</td>
                <td>{color.hex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default ColorSearchTool;
