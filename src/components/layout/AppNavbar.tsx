import { Link, useNavigate } from "react-router-dom";
import { useRenderCount } from "../../hooks/useRenderCount";

const AppNavbar = () => {
  const navigate = useNavigate();

  const renderCount = useRenderCount();

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

  return (
    <nav>
      <h5>Navabar render count: {renderCount}</h5>
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

export default AppNavbar;
