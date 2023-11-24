import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import Inbox from "./Inbox";
import NotFound from "../../components/not-found";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/my-inbox" Component={Inbox} />

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
};
export default Index;
