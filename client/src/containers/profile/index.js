import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import MemberProfile from "./member-profile";
import ManageProfile from "./manage-profile";
import NotFound from "../../components/not-found";

const Profile = () => {
  return (
    <>
      <Routes>
        <Route path="/member-profile/:memberId" Component={MemberProfile} />
        <Route path="/manage-profile" Component={ManageProfile} />

        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  );
};
export default Profile;
