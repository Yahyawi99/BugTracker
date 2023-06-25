import React, { useContext, useState } from "react";

const AppContext = React.createContext();
const NavBarProvider = ({ children }) => {
  const [clicked, setClicked] = useState("dashboard");
  const [dropDown, setDropDown] = useState("");

  const showHideDropDown = (e, value) => {
    if (dropDown === value) {
      setDropDown("");
    } else {
      setDropDown(value);
    }
  };

  return (
    <AppContext.Provider
      value={{
        clicked,
        setClicked,
        dropDown,
        showHideDropDown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useNavGlobal = () => useContext(AppContext);

export default NavBarProvider;
