import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const NavBarProvider = ({ children }) => {
  const [clicked, setClicked] = useState("dashboard");
  const [dropDown, setDropDown] = useState("");
  const [isMenu, setIsMenu] = useState(true);

  const showHideDropDown = (e, value) => {
    if (dropDown === value) {
      setDropDown("");
    } else {
      setDropDown(value);
    }
  };

  const menuSettings = (value) => {
    if (value === "menu") {
      setIsMenu(true);
    } else {
      setIsMenu(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        clicked,
        setClicked,
        dropDown,
        showHideDropDown,
        menuSettings,
        isMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useNavGlobal = () => useContext(AppContext);

export default NavBarProvider;
