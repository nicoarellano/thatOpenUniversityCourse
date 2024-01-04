import * as React from "react";
import { ViewerContext } from "../IFCViewer";
import { ToDo, TodoCreator } from "../../../bim-components/TodoCreator";
import { TodosCard } from "./TodosCard";

export function ProjectTodos() {
  const { viewer } = React.useContext(ViewerContext);
  const [todoList, setTodoList] = React.useState<ToDo[]>([]);

  const createTodo = async () => {
    if (!viewer) return;
    const todoCreator = await viewer.tools.get(TodoCreator);
    todoCreator.addToDo("My custom todo", "High");
    setTodoList([...todoCreator.list]);
  };

  const todoCards = todoList.map((todo, index) => (
    <TodosCard
      message={todo.description}
      priority={todo.priority}
      date={todo.date}
      key={index}
    />
  ));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("SEARCH TODO: ", e.target.value);
  };

  return (
    <div className="dashboard-card" style={{ flexGrow: 1 }}>
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
          <span className="material-symbols-rounded icon" onClick={createTodo}>
            add
          </span>
        </div>
      </header>
      <div
        style={{
          overflow: "auto",
          minHeight: 0,
          maxHeight: "330px",
        }}
      >
        {todoCards}
      </div>
    </div>
  );
}
