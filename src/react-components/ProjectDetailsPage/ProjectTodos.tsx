import * as React from "react";
import { Project } from "../../classes/Project";

interface Props {
  project: Project;
}

export function ProjectTodos(props: Props) {
  return (
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
              <p>Make anything here as you want, even something longer.</p>
            </div>
            <p style={{ textWrap: "nowrap", marginLeft: 10 }}>Fri, 20 sep</p>
          </div>
        </div>
      </div>
    </div>
  );
}
