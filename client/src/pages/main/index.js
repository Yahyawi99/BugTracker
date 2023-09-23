import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteProtector from "../../context/auth/RouteProtector";
// context
import NavbarProvider from "../../context/Navbar";
import AuthProvider from "../../context/auth/Auth-context";
// main
import Dashboard from "../../containers/dashboard";
import AllProjects from "../../containers/projects/all-projects";
// components
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
// css
import "../../styles/pages/main/index.css";

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
              <Route path="/all-projects" Component={AllProjects} />
            </Route>
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Main;
