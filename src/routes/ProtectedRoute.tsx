import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../components/layout/ErrorMessage";
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

  const userJson = localStorage.getItem("user");

  // TODO: wrap in try-catch block
  const user = userJson ? JSON.parse(userJson) as User : null;

  useEffect(() => {
    if (!user) {
      navigate("/login"); // or Unauthorized page
    }
  }, [user, navigate]);

  return (
    <>
      {allowedRoles?.includes(user?.role ?? "") ? (
        children
      ) : (
        <ErrorMessage error="Unauthorized user" />
      )}
    </>
  );
};

export default ProtectedRoute;
