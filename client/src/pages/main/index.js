import React from "react";
import { Route, Routes } from "react-router-dom";
// Route protector
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
      <Header />

      <div className="NavbarAndMain">
        <Navbar />

        <main>
          <Route element={<RouteProtector />}>
            <Route path="/dashboard" Component={Dashboard} />
          </Route>
        </main>
      </div>
    </section>
  );
};

export default Main;
