import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { User } from "../features/auth/LoginPage";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    // TODO: wrap in try-catch block
    const user = userJson ? (JSON.parse(userJson) as User) : null;

    if (!user) {
      navigate("/login"); // or Unauthorized page
    }

    if (!allowedRoles?.includes(user?.role ?? "")) {
      navigate("/unauthorized");
    }
  }, [navigate, allowedRoles]);

  return <>{children}</>;
};

export default ProtectedRoute;
