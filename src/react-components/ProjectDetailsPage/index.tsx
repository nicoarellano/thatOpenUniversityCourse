import * as React from "react";
import * as Router from "react-router-dom";

import { ProjectsManager } from "../../classes/ProjectsManager";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectInformation } from "./ProjectInformation";
import { ProjectTodos } from "./ProjectTodos";
import { ProjectViewer } from "./ProjectViewer";

interface Props {
  projectsManager: ProjectsManager;
}

export function ProjectDetailsPage(props: Props) {
  const [searchParams] = Router.useSearchParams();
  const id = searchParams.get("id");

  if (!id)
    return (
      <p style={{ margin: "4rem" }}>⚠️ Project ID is needed to see this page</p>
    );
  const project = props.projectsManager.getProject(id as string);
  if (!project)
    return (
      <p style={{ margin: "4rem" }}>
        ⚠️ Project with ID: <i>'{id}'</i> wasn't found
      </p>
    );

  return (
    <>
      <section className="page" id="project-details">
        <ProjectHeader project={project} />
        <div className="main-page-content">
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
          >
            <ProjectInformation project={project} />
            <ProjectTodos project={project} />
          </div>
          <ProjectViewer project={project} />
        </div>
      </section>
    </>
  );
}
