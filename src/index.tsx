// Import React
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as Router from "react-router-dom";

// Import Components
import { Sidebar } from "./react-components/Sidebar";
import { ProjectsPage } from "./react-components/ProjectsPage";

import { ProjectsManager } from "./classes/ProjectsManager";
import { ProjectDetailsPage } from "./react-components/ProjectDetailsPage";

const projectsManager = new ProjectsManager();

const rootElement = document.getElementById("app") as HTMLDivElement;
const appRoot = ReactDOM.createRoot(rootElement);
appRoot.render(
  <>
    <Router.BrowserRouter>
      <Sidebar />
      <Router.Routes>
        <Router.Route
          path="/"
          element={<ProjectsPage projectsManager={projectsManager} />}
        ></Router.Route>
        <Router.Route
          path="/project"
          element={<ProjectDetailsPage projectsManager={projectsManager} />}
        ></Router.Route>
      </Router.Routes>
    </Router.BrowserRouter>
  </>
);
