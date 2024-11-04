import { Outlet } from "react-router-dom";

import AppNavbar from "./AppNavbar";
import useRenderCount from "../../hooks/useRenderCount";

const Layout = () => {
  const count = useRenderCount();

  return (
    <>
      <h5>Layout render count: {count}</h5>
      <header>
        <AppNavbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
