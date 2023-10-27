import React from "react";
// hooks
import useUsers from "../../hooks/useUsers";
// components
import ShowAllDocuments from "../../components/shared/ShowAllDocuments";
// css
import "../../styles/containers/admin/manage-roles.css";

const ManageRoles = () => {
  const { getAllUsers, allUsers, updateCurrentUser } = useUsers();

  return (
    <ShowAllDocuments
      sectionName="Manage Roles"
      controller={getAllUsers}
      updateUser={updateCurrentUser}
      labels={["Avatar", "Name", "Current Role", "Manage Role", "Action"]}
      sortLabels={["Name", "Current Role"]}
      data={allUsers}
    />
  );
};

export default ManageRoles;
