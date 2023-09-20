import React from "react";
import { Routes, Route } from "react-router-dom";
import { useMainContext } from "./context";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { skin } = useMainContext();

  const stylesVariables = {
    "--main-clr": `var(--${skin})`,
    "--main-clr-hover": `var(--${skin}-hover)`,
  };

  return (
    <div className="App" style={stylesVariables}>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route axact path="/login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
