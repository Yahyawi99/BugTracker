import { useState } from "react";
import axios from "axios";
import { useMainContext } from "../context/global";

const useProjects = () => {
  const { alertMe, loading } = useMainContext();
  const [allProjects, setAllProjects] = useState([]);
  const [singleProject, setSingleProject] = useState({});

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

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  // get single project
  const getSingleProject = async (
    projectId,
    page,
    sortOption,
    limit,
    searchInput
  ) => {
    try {
      loading(true);

      const response = await axios.get(
        `/api/v1/project/${projectId}?page=${page}&limit=${limit}&sort=${sortOption}&search=${searchInput}`
      );

      loading(false);

      setSingleProject(response.data);

      await alertMe("Done.", "var(--success)");
    } catch (error) {
      loading(false);

      const msg = error.response.data.msg;
      // const msg = "Something went wrong please try again later!";
      await alertMe(msg + "!", "var(--danger)");
    }
  };

  // Edit project
  const editProject = async (projectId, updates) => {
    if (!singleProject.project.name || !singleProject.project.name) {
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

      await alertMe("Done.", "var(--success)");

      window.history.back();

      setSingleProject({ ...singleProject, project: response.data.project });
    } catch (error) {
      loading(false);

      await alertMe(
        "something went wrong please try again!" + "!",
        "var(--danger)"
      );
    }
  };

  // // Archive project
  const archiveProject = async (projectId, isArchived) => {
    try {
      loading(true);

      await axios.patch(`/api/v1/project/archive/${projectId}`, {
        isArchived,
      });

      loading(false);

      await alertMe("Done.", "var(--success)");

      window.location.reload();
    } catch (error) {
      loading(false);

      await alertMe(
        "something went wrong please try again!" + "!",
        "var(--danger)"
      );
    }
  };

  return {
    getAllProjects,
    allProjects,
    getSingleProject,
    singleProject,
    editProject,
    archiveProject,
  };
};

export default useProjects;
