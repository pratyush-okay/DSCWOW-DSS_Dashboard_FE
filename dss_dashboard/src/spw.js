import React, { useState } from "react";

const Spw = () => {
  const [SpwList, setSpwList] = useState([]);
  const apiUrl = "https://192.168.0.26:5001";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log("This is your Small priority List", data));
};

export default Spw;
