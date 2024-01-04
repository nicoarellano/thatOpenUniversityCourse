import * as React from "react";
import { Project } from "../../classes/Project";

interface Props {
  project: Project;
}

export function ProjectViewer(props: Props) {
  return (
    <div
      id="viewer-container"
      className="dashboard-card"
      style={{ minWidth: 0, position: "relative", maxHeight: "100%" }}
    />
  );
}
