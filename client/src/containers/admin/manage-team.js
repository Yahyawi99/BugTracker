import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// dnd
import { DndContext, useDroppable, useDraggable, onDrag } from "@dnd-kit/core";
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
  const [team, setTeam] = useState([]);

  useEffect(() => {
    getSingleProject(projectId);
    getAllUsers(1, "", Infinity);
  }, []);

  if (singleProject.project) {
    var { managedBy } = singleProject.project;
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

      setTeam(singleProject.project.team);
    }
  }, [allUsers, singleProject]);

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
            <DndContext
              onDragEnd={(event) => {
                console.log(event);
                const { over, active } = event;
                if (over) {
                  const { id: sourceId } = active;
                  const { id: targetId } = over;

                  const sourceItems = targetId === "droppable-1" ? devs : team;
                }
              }}
            >
              {devs && <Droppable data={devs} draggableId="droppable-1" />}

              <FontAwesomeIcon icon={faArrowRightArrowLeft} />

              {team && <Droppable data={team} draggableId="droppable-2" />}
            </DndContext>
          </div>
        </div>
      </div>
    </section>
  );
};

// ********************************
// Droppable
const Droppable = ({ data, draggableId }) => {
  const { setNodeRef } = useDroppable({ id: draggableId });

  return (
    <div ref={setNodeRef}>
      {data.map((dev, i) => {
        return <Draggable key={i} data={dev} />;
      })}
    </div>
  );
};

// ********************************
// Draggable
const Draggable = ({ data: { _id, name } }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <p key={_id} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {name}
    </p>
  );
};

export default ManageTeam;
