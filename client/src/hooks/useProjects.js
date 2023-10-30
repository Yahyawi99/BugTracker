import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allProjects, setAllProjects] = useState([]);
  const [singleProject, setSingleProject] = useState({});
  const [userProjects, setUserProjects] = useState({});

  //   get all projects
  const getAllProjects = async (
    page,
    sortOption,
    limit,
    searchInput,
    isArchived
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}&isArchived=${isArchived}`
      );

      loading(false);

      setAllProjects(response.data);

      alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later!", "var(--danger)");
    }
  };

  // get single project
  const getSingleProject = async (
    projectId,
    page,
    sortOption = "",
    limit,
    searchInput = ""
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project/${projectId}?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}`
      );

      loading(false);

      setSingleProject(response.data);

      alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later!", "var(--danger)");
    }
  };

  // Edit project
  const editProject = async (projectId, updates) => {
    if (!singleProject.project.name || !singleProject.project.description) {
      await alertMe("All fields are required!" + "!", "var(--danger)");
    }

    const {
      name,
      description,
      startDate,
      endDate,
      priority,
      managedBy: { _id: managedBy },
    } = updates;

    try {
      loading(true);

      const response = await axios.patch(`/api/v1/project/${projectId}`, {
        name,
        description,
        startDate,
        endDate,
        priority,
        managedBy,
      });

      loading(false);

      alertMe("Done.", "var(--success)");

      window.history.back();
    } catch (error) {
      loading(false);

      alertMe("something went wrong please try again!" + "!", "var(--danger)");
    }
  };

  //Archive project
  const archiveProject = async (projectId, isArchived) => {
    try {
      loading(true);

      await axios.patch(`/api/v1/project/archive/${projectId}`, {
        isArchived,
      });

      loading(false);

      alertMe("Done.", "var(--success)");

      window.location.reload();
    } catch (error) {
      loading(false);

      alertMe("something went wrong please try again!" + "!", "var(--danger)");
    }
  };

  // create project
  const createProject = async (newProject) => {
    if (
      !newProject.name ||
      !newProject.description ||
      !newProject.priority ||
      !newProject.startDate ||
      !newProject.endDate
    ) {
      alertMe("Please fill out the required fields", "var(--danger)");
      return;
    }

    try {
      loading(true);

      await axios.post("/api/v1/project", newProject);

      loading(false);

      await alertMe("Project Created", "var(--success)");

      window.location.href = "/projects/all-projects";
    } catch (error) {
      loading(false);

      alertMe("Something went wrong please try again later", "var(--danger)");
    }
  };

  // user projects
  const getUserProjects = async (page, sortOption, limit, searchInput) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project/user-projects/?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}`
      );

      setUserProjects(response.data);

      loading(false);

      alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      alertMe("something went wrong please try again!" + "!", "var(--danger)");
    }
  };

  return {
    getAllProjects,
    allProjects,
    getSingleProject,
    singleProject,
    editProject,
    archiveProject,
    createProject,
    getUserProjects,
    userProjects,
  };
};

export default useProjects;
