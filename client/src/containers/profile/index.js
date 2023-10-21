import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import MemberProfile from "./member-profile";
import ManageProfile from "./manage-profile";

const Profile = () => {
  return (
    <>
      <Routes>
        <Route path="/member-profile/:memberId" Component={MemberProfile} />
        <Route path="/manage-profile" Component={ManageProfile} />
      </Routes>
    </>
  );
};
export default Profile;
