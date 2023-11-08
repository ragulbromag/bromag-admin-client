import React from "react";
import SideNavbar from "./sidenavbar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RootLayout() {
    const location=useLocation()
  return (
    <div className="flex">
      <div className={`${location.pathname.split('/').includes("login")?"hidden":"block"}`}>
        <SideNavbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
