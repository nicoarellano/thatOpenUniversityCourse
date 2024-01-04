import * as React from "react";

interface Props {
  message: string;
}

export function WarningMessage(props: Props) {
  return (
    <p
      style={{
        margin: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.8rem",
      }}
    >
      <span className="material-symbols-rounded">warning</span> {props.message}
    </p>
  );
}
