import * as React from "react";
import { IProject } from "../classes/Project";
import { ProjectsManager } from "../classes/ProjectsManager";

export function ProjectCard({
  id,
  code,
  name,
  description,
  userRole,
  status,
  cost,
  progress,
  color,
}): React.ReactElement<IProject> {
  const [projectsManager] = React.useState(new ProjectsManager());
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
              backgroundColor: color,
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
        <div onClick={() => projectsManager.deleteProject(id)} className="icon">
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
