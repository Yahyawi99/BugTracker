import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// dnd
import {
  DndContext,
  useDroppable,
  useDraggable,
  useSensor,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
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

  // *********************
  // dnd
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  const onDragDnd = (e) => {
    const destination = e.over?.id;
    const id = e.active.data.current?.id ?? "";
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? "ToDo";

    if (destination === parent) {
      return;
    }

    if (destination === "team") {
      const member = devs.find((user) => user._id === id);

      setTeam([...team, member]);
      setDevs([...devs.filter((user) => user._id !== id)]);
    }

    if (destination === "developers") {
      const member = team.find((user) => user._id === id);

      setDevs([...devs, member]);
      setTeam([...team.filter((user) => user._id !== id)]);
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragDnd}
            >
              {devs && (
                <Droppable
                  data={devs}
                  droppableId="developers"
                  parent="developers"
                />
              )}

              <FontAwesomeIcon icon={faArrowRightArrowLeft} />

              {team && (
                <Droppable data={team} droppableId="team" parent="team" />
              )}
            </DndContext>
          </div>

          <button type="button">Assign Members</button>
        </div>
      </div>
    </section>
  );
};

// ********************************
// Droppable
const Droppable = ({ data, droppableId, parent }) => {
  const { setNodeRef } = useDroppable({ id: droppableId });

  return (
    <div>
      <h5 className="title">
        {parent === "team" ? "On Project" : "Company Developers"}
      </h5>
      <div
        ref={setNodeRef}
        className={`${data.length === 0 && "emptyDroppable"}`}
      >
        {data.map((user, i) => {
          return <Draggable key={i} user={user} index={i} parent={parent} />;
        })}
      </div>
    </div>
  );
};

// ********************************
// Draggable
const Draggable = ({ user: { _id, name }, index, parent }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
    data: { id: _id, index, parent },
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
