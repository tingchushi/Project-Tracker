import { Outlet } from "react-router-dom";
import Navbar1 from "./Navbar1";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet" />
      <Outlet />
      <Sidebar />
      {/* <Navbar1 /> */}
    </>
  );
}

export default Layout;