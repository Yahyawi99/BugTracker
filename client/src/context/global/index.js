import React, { useContext, useState } from "react";
// Utils
import wait from "../../utils/wait";

const AppContext = React.createContext();
const MainProvider = ({ children }) => {
  const [skin, setSkin] = useState("blue");
  const [alert, setAlert] = useState({
    isOn: false,
    message: "",
    backClr: "",
  });

  // Alert functionality
  const alertMe = async (msgTxt, clr) => {
    setAlert({
      isOn: true,
      message: msgTxt,
      backClr: clr,
    });

    await wait(1500);

    setAlert({
      isOn: false,
      message: msgTxt,
      backClr: clr,
    });

    await wait(1500);
  };

  return (
    <AppContext.Provider
      value={{
        skin,
        setSkin,
        alert,
        alertMe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useMainContext = () => useContext(AppContext);

export default MainProvider;
