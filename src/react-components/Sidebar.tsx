import * as React from "react";
import * as Router from "react-router-dom";
import { ViewerContext } from "./ProjectDetailsPage/IFCViewer";
import { TodoCreator } from "../bim-components/TodoCreator";

export function Sidebar() {
  const { viewer } = React.useContext(ViewerContext);
  const createTodo = async () => {
    if (!viewer) return;
    const todoCreator = await viewer.tools.get(TodoCreator);
    todoCreator.addToDo("My custom todo", "High");
  };

  return (
    <aside id="sidebar">
      <img id="logo" src="../../assets/cdt-logo.png" alt="CDT" />
      <ul id="nav-buttons">
        <Router.Link to={"/"}>
          <li id="home-btn" title="Go to the Home page">
            <span className="material-symbols-rounded"> home </span>Home
          </li>
        </Router.Link>
        <Router.Link to={"/project"}>
          <li id="projects-page-button" title="Go to the Project page">
            <span className="material-symbols-rounded"> apartment </span>
            Projects
          </li>
        </Router.Link>
        <Router.Link to={"/users"}>
          <li id="users-page-button" title="Go to the Users page">
            <span className="material-symbols-rounded"> group </span>Users
          </li>
        </Router.Link>
        <li title="Create Todo" onClick={createTodo}>
          <span className="material-symbols-rounded">construction</span>To-Do
        </li>
      </ul>
    </aside>
  );
}
