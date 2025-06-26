import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AppContext = React.createContext();
const NavbarProvider = ({ children }) => {
  const location = useLocation();

  const [nav, setNav] = useState("menu");
  const [clicked, setClicked] = useState("");
  const [dropDown, setDropDown] = useState("");

  const dropDownFunctionality = (value) => {
    if (dropDown === value) {
      setDropDown("");
    } else {
      setDropDown(value);
    }
  };

  useEffect(() => {
    if (location.pathname == "/") setClicked("dashboard");
  }, []);

  return (
    <AppContext.Provider
      value={{
        nav,
        setNav,
        clicked,
        setClicked,
        dropDown,
        setDropDown,
        dropDownFunctionality,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useNavbar = () => useContext(AppContext);

export default NavbarProvider;
