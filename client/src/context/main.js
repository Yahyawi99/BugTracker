import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [skin, setSkin] = useState("blue");

  // check if user is authenticated
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

  return (
    <AppContext.Provider
      value={{
        authenticationCheck,
        isAuthenticated,
        skin,
        setSkin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useMain = () => useContext(AppContext);

export default MainProvider;
