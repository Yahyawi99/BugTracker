import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const NavbarProvider = ({ children }) => {
  const [nav, setNav] = useState("menu");
  const [clicked, setClicked] = useState("dashboard");
  const [dropDown, setDropDown] = useState("");

  const dropDownFunctionality = (value) => {
    if (dropDown === value) {
      setDropDown("");
    } else {
      setDropDown(value);
    }
  };

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
