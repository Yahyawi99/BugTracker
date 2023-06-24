import React from "react";
import { useMain } from "../context/main";
// components
import Header from "../components/Header";

const Home = () => {
  const { authenticationCheck, isAuthenticated } = useMain();

  authenticationCheck();

  if (isAuthenticated) {
    return (
      <section className="homeContainer">
        <Header />
      </section>
    );
  }
};

export default Home;
