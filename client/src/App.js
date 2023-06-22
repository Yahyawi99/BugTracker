import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
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
