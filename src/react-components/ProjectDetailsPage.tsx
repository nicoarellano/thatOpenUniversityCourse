import * as React from "react";
import * as Router from "react-router-dom";

import { Project } from "../classes/Project";
import { ProjectsManager } from "../classes/ProjectsManager";
import hexColorRange from "../utils/hexColorRange";

interface Props {
  projectsManager: ProjectsManager;
}

export function ProjectDetailsPage(props: Props) {
  const [searchParams] = Router.useSearchParams();
  const id = searchParams.get("id");

  React.useEffect(() => {
    console.log(id, props.projectsManager.list);
    const project = props.projectsManager.getProject(id as string);
    if (!(project && project instanceof Project)) return;
    console.log(project);
    setProject(project);
  }, [id]);

  const [project, setProject] = React.useState<Project>(
    props.projectsManager.list[0]
  );

  return (
    <section className="page" id="project-details">
      <header>
        <div>
          <h2>{project.name}</h2>
          <p style={{ color: "var(--background-300)" }}>
            {project.description}
          </p>
        </div>
      </header>
      <div className="main-page-content">
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "2rem" }}
        >
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
                  backgroundColor: project.color,
                  aspectRatio: 1,
                  borderRadius: "100%",
                  padding: 12,
                }}
              >
                {project.code}
              </p>
              <button className="btn-secondary">
                <p style={{ width: "100%" }}>Edit</p>
              </button>
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
                    backgroundColor: hexColorRange(project.progress),
                    padding: "4px 0",
                    textAlign: "center",
                  }}
                >
                  {project.progress}%
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-card" style={{ flexGrow: 1 }}>
            <div
              style={{
                padding: "20px 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4>To-Do</h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  columnGap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <span className="material-symbols-rounded"> search </span>
                  <input
                    type="text"
                    placeholder="Search To-Do's by name"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="material-symbols-rounded icon"> add </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 2rem",
                rowGap: 20,
              }}
            >
              <div className="todo-item">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      columnGap: 15,
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="material-icons-round"
                      style={{
                        padding: 10,
                        backgroundColor: "#686868",
                        borderRadius: "var(--border-radius)",
                      }}
                    >
                      construction
                    </span>
                    <p>
                      Make anything here as you want, even something longer.
                    </p>
                  </div>
                  <p style={{ textWrap: "nowrap", marginLeft: 10 }}>
                    Fri, 20 sep
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="viewer-container"
          className="dashboard-card"
          style={{ minWidth: 0, position: "relative" }}
        />
      </div>
    </section>
  );
}
