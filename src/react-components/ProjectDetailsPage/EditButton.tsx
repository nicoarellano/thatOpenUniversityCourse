import * as React from "react";
import { ProjectsManager } from "../../classes/ProjectsManager";

interface Props {
  id: string;
  projectsManager: ProjectsManager;
}

export function EditButton(props: Props) {
  const onButtonClick = () => {
    const { projectsManager } = props;
    projectsManager.editProjectById(props.id);
  };

  return (
    <button className="btn-secondary" onClick={onButtonClick}>
      <p style={{ width: "100%" }}>Edit</p>
    </button>
  );
}
