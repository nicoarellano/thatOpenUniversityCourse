import * as React from "react";

export function Sidebar() {
  return (
    <aside id="sidebar">
      <img id="logo" src="../../assets/cdt-logo.png" alt="CDT" />
      <ul id="nav-buttons">
        <li id="home-btn" title="Go to the Home page">
          <span className="material-symbols-rounded"> home </span>Home
        </li>
        <li id="projects-page-button" title="Go to the Projects page">
          <span className="material-symbols-rounded"> apartment </span>Projects
        </li>
        <li id="users-page-button" title="Go to the Users page">
          <span className="material-symbols-rounded"> group </span>Users
        </li>
      </ul>
    </aside>
  );
}
