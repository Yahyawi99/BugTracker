import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// hooks
import useUsers from "../../hooks/useUsers";
// css
import "../../styles/containers/profile/index.css";

const MemberProfile = () => {
  const { memberId } = useParams();
  const { getSingleUser, singleUser } = useUsers();

  useEffect(() => {
    getSingleUser(memberId);
  }, []);
  console.log(singleUser);

  return (
    <section className="memberProfile">
      <div className="memberInfo">
        <img src={singleUser.avatar} alt="member" />

        <h1 className="name">{singleUser.name} </h1>

        <p className="role">{singleUser.role} </p>

        <div className="email">
          <p>Email address : </p>
          <Link to={`mailto:${singleUser.email}`}>
            <p>{singleUser.email}</p>
          </Link>
        </div>

        <div className="phone">
          <p>Mobile : </p>
          {singleUser.phoneNumber ? (
            <a href={`tel:${singleUser.phoneNumber}`}>
              {singleUser.phoneNumber}
            </a>
          ) : (
            <p>No phone number</p>
          )}
        </div>
      </div>

      <div className="projects"></div>
    </section>
  );
};

export default MemberProfile;
