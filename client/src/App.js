import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useMain } from "./context";
// pages
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  // const { skin } = useMain();

  // const stylesVariables = {
  //   "--main-clr": `var(--${skin})`,
  //   "--main-clr-hover": `var(--${skin}-hover)`,
  // };

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route axact path="/login" Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
