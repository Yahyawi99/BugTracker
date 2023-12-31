import React from "react";
import { Route, Routes } from "react-router-dom";
import { useMainContext } from "./context/global";
// Route protector
import RouteProtector from "./context/auth/RouteProtector";
// components
import Login from "./pages/Login";
import Main from "./pages/main";
import Alert from "./components/shared/Alert";

function App() {
  const { skin } = useMainContext();

  const stylesVariables = {
    "--main-clr": `var(--${skin})`,
    "--main-clr-hover": `var(--${skin}-hover)`,
  };

  return (
    <div className="App" style={stylesVariables}>
      <Routes>
        <Route path="/login-register/*" Component={Login} />

        <Route element={<RouteProtector />}>
          <Route path="/*" element={<Main />} />
        </Route>
      </Routes>

      <Alert />
    </div>
  );
}

export default App;
