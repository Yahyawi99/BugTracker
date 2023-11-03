import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// dnd
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
// hooks
import useProjects from "../../hooks/useProjects";
import useUsers from "../../hooks/useUsers";
// components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/admin/manage-team.css";

const ManageTeam = () => {
  const { getSingleProject, singleProject } = useProjects();
  const { getAllUsers, allUsers } = useUsers();

  const { projectId } = useParams();

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    getSingleProject(projectId);
    getAllUsers(1, "", Infinity);
  }, []);

  if (singleProject.project) {
    var { managedBy, team } = singleProject.project;
  }

  useEffect(() => {
    if (allUsers.users && singleProject.project) {
      setDevs(() => {
        let newValue = allUsers.users.filter(
          (user) => user.role === "developer" || user.role === "submitter"
        );

        newValue = newValue.filter((user) =>
          team.every((member) => member._id !== user._id)
        );

        return newValue;
      });
    }
  }, [allUsers, singleProject]);

  // dnd
  const handleDragAndDrop = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      // remove the draggable task
      const oldColumn = devs.find((e) => e._id === source.droppableId);
    }
  };

  return (
    <section className="manageTeam">
      <HomeBtn name="Manage Team" />

      <div>
        <div className="first-column">
          <h1>Project Team</h1>
          <p>{(team && team.length + (managedBy ? 1 : 0)) || 0} team members</p>

          {managedBy && (
            <div className="pm">
              <img src={managedBy.avatar} alt="project-manager" />

              <div className="info">
                <p className="name">{managedBy.name}</p>
                <p className="email">{managedBy.email}</p>
                <p className="role">Project Manager</p>

                <Link to={`/admin/manage-pm/${projectId}`}>
                  <button type="button">Manage PM</button>
                </Link>
              </div>
            </div>
          )}

          <div className="team">
            {team &&
              team.map((member) => {
                const { _id, name, avatar, role } = member;

                return (
                  <div key={_id}>
                    <img src={avatar} alt="developer" />

                    <div>
                      <p className="name">{name}</p>
                      <p className="role">{role}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="second-column">
          <h1>Manage Developers</h1>

          <div className="dnd">
            <DragDropContext onDragEnd={(result) => handleDragAndDrop(result)}>
              <Droppable>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {devs &&
                      devs.map((dev, i) => {
                        const { _id, name } = dev;

                        return (
                          <Draggable draggableId={_id} key={_id} index={i}>
                            {(provided) => (
                              <p
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {name}
                              </p>
                            )}
                          </Draggable>
                        );
                      })}
                  </div>
                )}
              </Droppable>

              <FontAwesomeIcon icon={faArrowRightArrowLeft} />

              <Droppable>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {team &&
                      team.map((member, i) => {
                        const { _id, name } = member;

                        return (
                          <Draggable draggableId={_id} index={i} key={_id}>
                            {(provided) => (
                              <p
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {name}
                              </p>
                            )}
                          </Draggable>
                        );
                      })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageTeam;
