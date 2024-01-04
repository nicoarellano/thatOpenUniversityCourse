import * as React from "react";
import { Project } from "../../../classes/Project";
import { TodosHeader } from "./TodosHeader";
import { TodosCard } from "./TodosCard";

interface Props {
  project: Project;
}

export function ProjectTodos(props: Props) {
  return (
    <div className="dashboard-card" style={{ flexGrow: 1 }}>
      <TodosHeader />
      <div
        style={{
          overflow: "auto",
          minHeight: 0,
          maxHeight: "330px",
        }}
      >
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
      </div>
    </div>
  );
}
