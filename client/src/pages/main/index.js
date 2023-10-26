import React from "react";
import { Route, Routes } from "react-router-dom";
import RouteProtector from "../../context/auth/RouteProtector";
// context
import NavbarProvider from "../../context/Navbar";
import AuthProvider from "../../context/auth/Auth-context";
// main
import Dashboard from "../../containers/dashboard";
import Projects from "../../containers/projects";
import Tickets from "../../containers/tickets";
import Profile from "../../containers/profile";
import Admin from "../../containers/admin";
// components
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NotFound from "../../components/not-found";
// css
import "../../styles/pages/main/index.css";

const Main = () => {
  return (
    <section className="mainContainer">
      <AuthProvider>
        <Header />
      </AuthProvider>

      <div className="NavbarAndMain">
        <AuthProvider>
          <NavbarProvider>
            <Navbar />
          </NavbarProvider>
        </AuthProvider>

        <main>
          <Routes>
            <Route element={<RouteProtector />}>
              <Route path="/" Component={Dashboard} />
              <Route path="/projects/*" Component={Projects} />
              <Route path="/tickets/*" Component={Tickets} />
              <Route path="/profile/*" Component={Profile} />
              <Route path="/admin/*" Component={Admin} />

              <Route path="*" Component={NotFound} />
            </Route>
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Main;
