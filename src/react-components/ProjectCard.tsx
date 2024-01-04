import * as React from "react";
import * as Router from "react-router-dom";

import { Project } from "../classes/Project";
import { ProjectsManager } from "../classes/ProjectsManager";
import hexColorRange from "../utils/hexColorRange";

interface Props {
  project: Project;
}

export function ProjectCard(props: Props): React.ReactElement<Props> {
  const [projectsManager] = React.useState(new ProjectsManager());

  const onDeleteProjectClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log(projectsManager.list);
    projectsManager.deleteProject(id);
  };

  const { project } = props;

  const { id, code, name, description, userRole, status, cost, progress } =
    project;

  const progressColor = hexColorRange(project.progress);

  return (
    <div className="project-card">
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: progressColor,
              padding: "0.8rem",
              borderRadius: 8,
              aspectRatio: 1,
            }}
          >
            {code}
          </p>
          <div>
            <h5>{name}</h5>
            <p>{description}</p>
          </div>
        </div>
        <div onClick={(e) => onDeleteProjectClick(e)} className="icon">
          <span title="Delete project" className="material-symbols-rounded">
            delete
          </span>
        </div>
      </div>
      <div className="card-content">
        <div className="card-property">
          <p style={{ color: "var(--background-300)" }}>UserRole</p>
          <p>{userRole}</p>
        </div>
        <div className="card-property">
          <p style={{ color: "var(--background-300)" }}>Status</p>
          <p>{status}</p>
        </div>
        <div className="card-property">
          <p style={{ color: "var(--background-300)" }}>Cost</p>
          <p>$ {cost}</p>
        </div>
        <div className="card-property">
          <p style={{ color: "var(--background-300)" }}>Progress</p>
          <p>{progress} %</p>
        </div>
      </div>
    </div>
  );
}
