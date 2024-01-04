import * as React from "react";
import { Project } from "../../classes/Project";

interface Props {
  project: Project;
}

export function ProjectHeader(props: Props) {
  const { project } = props;
  return (
    <header>
      <div>
        <h2>{project.name}</h2>
        <p style={{ color: "var(--background-300)" }}>{project.description}</p>
      </div>
    </header>
  );
}
