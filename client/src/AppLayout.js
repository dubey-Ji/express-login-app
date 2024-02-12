import { Outlet } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Outlet context={[isAuthenticated, setIsAuthenticated]} />
  )
};

export default AppLayout;