import React from "react";
import { useParams } from "react-router-dom";
// hooks
import useUsers from "../../hooks/useUsers";
// css
import "../../styles/containers/profile/index.css";

const MemberProfile = () => {
  const { memberId } = useParams();
  const { getSingleUser, singleUser } = useUsers();

  return (
    <section className="memberProfile">
      <div className="memberInfo">
        <img
          src="../../../public/assets/images/default-avatar-1.jpg"
          alt="member"
        />

        <p className="role">role</p>

        <div className="email">
          <p>Email address : </p>
          <p>yassinyahyawi26@gmail.com</p>
        </div>

        <div className="phone">
          <p>Mobile : </p>
          {true ? <p>0675391909</p> : <p>No phone number</p>}
        </div>
      </div>
    </section>
  );
};

export default MemberProfile;
