import React from "react";
import axios from "axios";

const AppContext = React.createContext();
const Provider = ({ children }) => {
  return <AppContext.Provider value={""}>{children}</AppContext.Provider>;
};

export default Provider;
