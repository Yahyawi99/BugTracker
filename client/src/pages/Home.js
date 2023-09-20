import React from "react";
// import { useMain } from "../context";
// import NavBarProvider from "../context/NavBar";
// components
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import Content from "../components/Content";
// css
import "../styles/pages/home.css";

const Home = () => {
  // const { authenticationCheck, isAuthenticated } = useMain();

  // authenticationCheck();

  // if (isAuthenticated) {
  return (
    <main className="homeContainer">
      <Header />

      <section>
        {/* <NavBarProvider> */}
        <NavBar />
        {/* </NavBarProvider> */}

        <Content />
      </section>
    </main>
  );
  // }
};

export default Home;
