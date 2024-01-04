import * as React from "react";
import { ToDoPriority } from "../../../bim-components/TodoCreator";
import todoPriorityColor from "../../../utils/todoPriorityColor";

interface Props {
  message: string;
  priority: ToDoPriority;
  date: Date;
}

export function TodosCard(props: Props) {
  const { message, priority, date } = props;
  let priorityColor = todoPriorityColor(priority);

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
                backgroundColor: `#${priorityColor}`,
                borderRadius: "var(--border-radius)",
              }}
            >
              construction
            </span>
            <p>{message}</p>
          </div>
          <p
            style={{
              textWrap: "nowrap",
              marginLeft: 10,
              color: "var(--background-300)",
            }}
          >
            {date.toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
