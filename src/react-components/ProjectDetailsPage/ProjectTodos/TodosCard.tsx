import * as React from "react";

export function TodosCard() {
  return (
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
            <p>Make anything here as you want.</p>
          </div>
          <p
            style={{
              textWrap: "nowrap",
              marginLeft: 10,
              color: "var(--background-300)",
            }}
          >
            Fri, 20 sep
          </p>
        </div>
      </div>
    </div>
  );
}
