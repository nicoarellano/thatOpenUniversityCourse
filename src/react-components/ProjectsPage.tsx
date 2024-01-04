import * as React from "react";
import * as Router from "react-router-dom";

import { Project } from "../classes/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectsManager } from "../classes/ProjectsManager";
import { NewProjectModal } from "./NewProjectModal";
import { ProjectsSearchBox } from "./ProjectsSearchBox";
import { WarningMessage } from "../utils/WarningMessage";

interface Props {
  projectsManager: ProjectsManager;
}

export function ProjectsPage(props: Props) {
  const { projectsManager } = props;

  const [projects, setProjects] = React.useState<Project[]>(
    projectsManager.list
  );

  const projectCards = projects.map((project) => (
    <Router.Link to={`/project?id=${project.id}`} key={project.id}>
      <ProjectCard project={project} />
    </Router.Link>
  ));

  React.useEffect(() => {
    console.log("Projects state updated: ", projects);
  }, [projects]);

  projectsManager.onProjectCreated = () => {
    setProjects([...projectsManager.list]);
  };
  projectsManager.onProjectDeleted = () => {
    setProjects([...projectsManager.list]);
  };

  const [modalOpen, setModalOpen] = React.useState(false);

  const onNewProjectClick = () => {
    setModalOpen(!modalOpen);
    const modal = document.getElementById("new-project-modal");
    if (!(modal && modal instanceof HTMLDialogElement)) return;
    modal.showModal();
  };

  // ⬇️ Export projects to JSON
  const onExportProjectClick = () => {
    projectsManager.exportToJSON("projects");
  };
  // ⬇️ Import projects from JSON
  const onImportProjectClick = () => {
    projectsManager.importFromJSON();
  };

  const onProjectSearch = (value: string) => {
    setProjects(projectsManager.filterProjects(value));
  };

  const onProjectDelete = () => {};

  return (
    <section className="page" id="projects-page" style={{ display: "flex" }}>
      <NewProjectModal projectsManager={projectsManager} />
      <header>
        <h1>Projects</h1>
        <ProjectsSearchBox onChange={onProjectSearch} />
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "1rem" }}
        >
          <span
            id="import-project-btn"
            title="Import projects"
            className="material-symbols-rounded icon"
            onClick={onImportProjectClick}
          >
            upload
          </span>
          <span
            id="export-project-btn"
            title="Export projects"
            className="material-symbols-rounded icon"
            onClick={onExportProjectClick}
          >
            download
          </span>
          <button
            onClick={onNewProjectClick}
            className="button"
            id="new-project-button"
          >
            <span className="material-symbols-rounded"> add </span>New Project
          </button>
        </div>
      </header>
      {Boolean(projects.length > 0) ? (
        <section id="projects-list">{projectCards}</section>
      ) : (
        <WarningMessage message="There are no projects to display!" />
      )}
    </section>
  );
}
