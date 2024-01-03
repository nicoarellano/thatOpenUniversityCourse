import * as React from "react";
import * as Router from "react-router-dom";

export function Sidebar() {
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
      </ul>
    </aside>
  );
}
