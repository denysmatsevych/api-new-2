import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRenderCount from "../../hooks/useRenderCount";

const AppNavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userJson = localStorage.getItem("user");

  let user;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error(error);
  }

  const renderCount = useRenderCount();

  return (
    <nav>
      <h5>AppNavbarComponent count: {renderCount}</h5>
      <ul>
        <li>
          <Link to="/" state={{ hello: "Hello, world!" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/todo">ToDo</Link>
        </li>
        {user?.role === "admin" && (
          <li>
            <Link to="/users">Users</Link>
          </li>
        )}
        <li>
          <Link to="/books">Reviews</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

const AppNavbar = memo(AppNavbarComponent);

export default AppNavbar;
