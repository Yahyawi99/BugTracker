import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import ManageRoles from "./manage-roles";
import NotFound from "../../components/not-found";
import ManageTeam from "./manage-team";
import ManagePM from "./manage-pm";

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/manage-roles" Component={ManageRoles} />
        <Route path="/manage-team/:projectId" Component={ManageTeam} />
        <Route path="/manage-pm/:projectId" Component={ManagePM} />

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
};
export default Index;
