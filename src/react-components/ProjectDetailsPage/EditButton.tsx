import * as React from "react";

interface Props {
  id: string;
}

export function EditButton(props: Props) {
  const onButtonClick = () => alert(props.id);

  return (
    <button className="btn-secondary" onClick={onButtonClick}>
      <p style={{ width: "100%" }}>Edit</p>
    </button>
  );
}
