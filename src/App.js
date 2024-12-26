// App.js
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import PhaseOverview from "./Pages/PhaseOverview";
import Dashboard from "./Pages/Dashboard";
import TestPage from "./Pages/TestPage";
import Header from "./Components/Header";
import Overview from "./Pages/Overview";
import Compare from "./Pages/Compare";
import { sideBarTreeArray } from "./sidebarInfo2"; // Ensure correct import
import generateRoutes from "./generateRoutes.js"; // Ensure correct path
import PhaseOverviewPage from "./Pages/PhaseOverviewPage.jsx";
import Inverter from "./Pages/Inverter.jsx";
import IndiLayout from "./Pages/IndiLayout.jsx";

function App() {
  console.log("sideBarTreeArray:", sideBarTreeArray); // Debugging line

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* Phase Overview */}
          <Route path="peppl_p1" element={<PhaseOverview />}>
            <Route index element={<PhaseOverviewPage />} />

            {/* Nested IndiLayout */}
            <Route path="" element={<IndiLayout />}>
              {Object.keys(sideBarTreeArray).map((section) =>
                generateRoutes(sideBarTreeArray[section], `peppl_p1/${section}`)
              )}
            </Route>
          </Route>
          {/* <Route path="test" element={<PhaseOverview />}>
            <Route path="test1" element={<PhaseOverview />}>
              <Route path="test3" element={<TestPage />} />
            </Route>
          </Route> */}
          {/* Additional Phases */}
          <Route path="peppl_p2/*" element={<PhaseOverview />}>
            {sideBarTreeArray["peppl_p2"] &&
              generateRoutes(sideBarTreeArray["peppl_p2"], "peppl_p2")}
          </Route>
          <Route path="peppl_p3/*" element={<PhaseOverview />}>
            {sideBarTreeArray["peppl_p3"] &&
              generateRoutes(sideBarTreeArray["peppl_p3"], "peppl_p3")}
          </Route>{" "}
          {/* Compare Page */}
          <Route path="compare" element={<Compare />} />
          <Route path="inverter" element={<Inverter />} />
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
