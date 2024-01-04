import * as React from "react";

export function TodosSearchBox() {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("SEARCH TODO: ", e.target.value);
  };
  return (
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
        placeholder="Search To-Do's by name..."
        style={{ width: "100%" }}
        onChange={(e) => onInputChange(e)}
      />
    </div>
  );
}
