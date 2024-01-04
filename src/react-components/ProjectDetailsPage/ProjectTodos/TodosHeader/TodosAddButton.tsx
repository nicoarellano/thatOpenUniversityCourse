import * as React from "react";

export function TodosAddButton() {
  const onAddClick = () => {
    console.log("ADD TODO!");
  };
  return (
    <span className="material-symbols-rounded icon" onClick={onAddClick}>
      add
    </span>
  );
}
