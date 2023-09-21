import React from "react";
import { Route, Routes } from "react-router-dom";
// context
import NavbarProvider from "../../context/Navbar";
import AuthProvider from "../../context/Auth-context";
// main
import Dashboard from "../../containers/dashboard";
// components
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
// css
import "../../styles/pages/main/index.css";
import RouteProtector from "../../context/RouteProtector";

const Main = () => {
  return (
    <section className="mainContainer">
      <AuthProvider>
        <Header />
      </AuthProvider>

      <div className="NavbarAndMain">
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>

        <main>
          <Routes>
            <Route element={<RouteProtector />}>
              <Route path="/dashboard" Component={Dashboard} />
            </Route>
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Main;
