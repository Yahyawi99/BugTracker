import React from "react";
import { Route, Routes } from "react-router-dom";
// main
import Dashboard from "../../containers/dashboard";
// components
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
// import "../../styles/pages/dashboard/index.css";

const Home = () => {
  return (
    <section className="dashboard">
      <Header />

      <div>
        <Navbar />

        <main>
          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Home;
