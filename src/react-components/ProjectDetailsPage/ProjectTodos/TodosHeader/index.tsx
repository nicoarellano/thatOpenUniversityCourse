import * as React from "react";
import { TodosSearchBox } from "./TodosSearchBox";
import { TodosAddButton } from "./TodosAddButton";

export function TodosHeader() {
  return (
    <header
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
        <TodosSearchBox />
        <TodosAddButton />
      </div>
    </header>
  );
}
