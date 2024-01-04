import * as React from "react";
import { Project } from "../../classes/Project";
import hexColorRange from "../../utils/hexColorRange";
import { EditButton } from "./EditButton";
import { ProjectsManager } from "../../classes/ProjectsManager";

interface Props {
  project: Project;
  projectsManager: ProjectsManager;
}

export function ProjectInformation(props: Props) {
  const { project } = props;

  const progressColor = hexColorRange(project.progress);
  return (
    <div className="dashboard-card" style={{ padding: "2rem 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 2rem",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            backgroundColor: progressColor,
            aspectRatio: 1,
            borderRadius: "100%",
            padding: 12,
          }}
        >
          {project.code}
        </p>
        <EditButton id={project.id} projectsManager={props.projectsManager} />
      </div>
      <div style={{ padding: "0 2rem" }}>
        <div>
          <h5>{project.name}</h5>
          <p
            style={{
              color: "var(--background-300)",
              fontSize: "var(--font-base)",
            }}
          >
            {project.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            columnGap: "2rem",
            padding: "2rem 0px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                color: "var(--background-300)",
                fontSize: "var(--font-sm)",
              }}
            >
              Status
            </p>
            <p>{project.status}</p>
          </div>
          <div>
            <p
              style={{
                color: "var(--background-300)",
                fontSize: "var(--font-sm)",
              }}
            >
              Cost
            </p>
            <p>$ {project.cost}</p>
          </div>
          <div>
            <p
              style={{
                color: "var(--background-300)",
                fontSize: "var(--font-sm)",
              }}
            >
              Role
            </p>
            <p>{project.userRole}</p>
          </div>
          <div>
            <p
              style={{
                color: "var(--background-300)",
                fontSize: "var(--font-sm)",
              }}
            >
              Finish Date
            </p>
            <p>{project.finishDate.toDateString()}</p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "var(--background-200)",
            borderRadius: 9999,
            overflow: "auto",
          }}
        >
          <div
            style={{
              width: `${project.progress}%`,
              backgroundColor: progressColor,
              padding: "4px 0",
              textAlign: "center",
            }}
          >
            {project.progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
