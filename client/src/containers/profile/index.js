import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// hooks
import useUsers from "../../hooks/useUsers";
// css
import "../../styles/containers/profile/index.css";

const MemberProfile = () => {
  const { memberId } = useParams();
  const { getSingleUser, singleUser, getUserProjects, userProjects } =
    useUsers();

  useEffect(() => {
    getSingleUser(memberId);
    getUserProjects(memberId);
  }, []);

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

      <div className="projects">
        {userProjects.map((project) => {
          const {
            _id,
            name,
            priority,
            isArchive,
            description,
            team,
            tickets,
            startDate,
            endDate,
          } = project;

          console.log(project);

          return (
            <div key={_id} className="project">
              <div>
                <div>
                  <p className="name">{name}</p>
                  <p className="priority">{priority}</p>
                </div>

                {/* <i
                  onClick={(e) => toggleDropDown(e.currentTarget)}
                  className="arrow-down"
                >
                  <FontAwesomeIcon icon={faAngleDown} />
                </i> */}

                {/* <DropDownToggle
                  projectId={_id}
                  isArchive={isArchive}
                  archiveProject={archiveProject}
                /> */}
              </div>

              <div>
                <p dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              {/* <div>
                <div>
                  <p>Team :</p>

                  {team.length ? (
                    <div className="team">
                      {team.map((user) => {
                        const { _id, avatar } = user;

                        return <img key={_id} src={avatar} alt="user" />;
                      })}
                    </div>
                  ) : (
                    <div className="noTeam">No Assigned Members</div>
                  )}
                </div>

                <button type="button">Manage Team</button>
              </div> */}

              {/* <div className="progress">
                <motion.p
                  initial={{ width: 0 }}
                  animate={{ width: `${progress(startDate, endDate)}%` }}
                  transition={{ duration: 1 }}
                ></motion.p>
              </div> */}

              <div>
                <p>Tickets :</p>
                {/* <p>{tickets.length}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MemberProfile;
