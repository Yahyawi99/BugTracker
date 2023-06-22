import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticationCheck = async () => {
    const storage = localStorage.getItem("token");

    try {
      await axios.get("http://localhost:3001/", {
        headers: {
          Authorization: `${storage}`,
        },
      });

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      window.location = "/login";
    }
  };

  authenticationCheck();

  if (isAuthenticated) {
    return <h1>HOME</h1>;
  }
};

export default Home;
