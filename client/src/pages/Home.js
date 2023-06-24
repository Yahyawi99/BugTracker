import React from "react";
import { useMain } from "../context/main";
// components
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Content from "../components/Content";
// css
import "../styles/pages/home.css";

const Home = () => {
  const { authenticationCheck, isAuthenticated } = useMain();

  authenticationCheck();

  if (isAuthenticated) {
    return (
      <main className="homeContainer">
        <Header />

        <section>
          <NavBar />

          <Content />
        </section>
      </main>
    );
  }
};

export default Home;
