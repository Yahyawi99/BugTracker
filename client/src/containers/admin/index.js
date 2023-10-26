import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import ManageRoles from "./manage-roles";
import NotFound from "../../components/not-found";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/manage-roles" Component={ManageRoles} />

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
};
export default Index;
