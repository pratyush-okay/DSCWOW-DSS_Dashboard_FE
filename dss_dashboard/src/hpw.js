import React, { useState } from "react";

const Hpw = () => {
  const [HpwList, setHpwList] = useState([]);
  const apiUrl = "https://192.168.0.26:5001";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log("This is your High priority List", data));
};

export default Hpw;
