import * as React from "react";
import * as Router from "react-router-dom";

import { ProjectsManager } from "../../classes/ProjectsManager";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectInformation } from "./ProjectInformation";
import { ProjectTodos } from "./ProjectTodos";
import { ProjectViewer } from "./ProjectViewer";
import { WarningMessage } from "../../utils/WarningMessage";

interface Props {
  projectsManager: ProjectsManager;
}

export function ProjectDetailsPage(props: Props) {
  const [searchParams] = Router.useSearchParams();
  const id = searchParams.get("id");

  if (!id)
    return <WarningMessage message="Project ID is needed to see this page" />;
  const project = props.projectsManager.getProject(id as string);
  if (!project)
    return (
      <WarningMessage message={`Project with ID: '${id}' wasn't found'}`} />
    );

  return (
    <>
      <section className="page" id="project-details">
        <ProjectHeader project={project} />
        <div className="main-page-content">
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              rowGap: "2rem",
              position: "relative",
              minHeight: "100%",
            }}
          >
            <ProjectInformation
              project={project}
              projectsManager={props.projectsManager}
            />
            <ProjectTodos project={project} />
          </div>
          <ProjectViewer project={project} />
        </div>
      </section>
    </>
  );
}
