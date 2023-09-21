import React from "react";
import { Route, Routes } from "react-router-dom";
import { useMainContext } from "./context";
// Route protector
import RouteProtector from "./context/RouteProtector";
// components
// import Header from "./components/Header";
// pages
import Login from "./pages/Login";
import Main from "./pages/main";

function App() {
  const { skin } = useMainContext();

  const stylesVariables = {
    "--main-clr": `var(--${skin})`,
    "--main-clr-hover": `var(--${skin}-hover)`,
  };

  return (
    <div className="App" style={stylesVariables}>
      <Routes>
        <Route path="/login" Component={Login} />

        <Route element={<RouteProtector />}>
          <Route path="*" element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

{
  /* <Route path="*" element={<Navigate to="/" replace />} /> */
}
{
  /* <Redirect to="/dashboard" /> */
}
