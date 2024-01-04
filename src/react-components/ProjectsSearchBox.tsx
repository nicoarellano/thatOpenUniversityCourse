import * as React from "react";

interface Props {
  onChange: (value: string) => void;
}

export function ProjectsSearchBox(props: Props) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
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
        placeholder="Search Projects by name..."
        style={{
          width: "100%",
          height: "2.5rem",
          backgroundColor: "var(--background-100)",
        }}
        onChange={(e) => onInputChange(e)}
      />
    </div>
  );
}
