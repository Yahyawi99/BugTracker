import React from "react";
import { Route, Routes } from "react-router-dom";
// main
import Dashboard from "../../containers/dashboard";
// components
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
// csss
import "../../styles/pages/main/index.css";

const Main = () => {
  return (
    <section className="mainContainer">
      <Header />

      <div className="NavbarAndMain">
        <Navbar />

        <main>
          {/* <Routes>
            <Route path="/" Component={Dashboard} />
          </Routes> */}
          <Dashboard />
        </main>
      </div>
    </section>
  );
};

export default Main;
