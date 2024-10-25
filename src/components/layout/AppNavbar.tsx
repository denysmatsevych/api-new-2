import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = localStorage.getItem("user");

  let role;

  try {
    if (user) {
      const userObj = JSON.parse(user);
      role = userObj.role;
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" state={{ hello: "Hello, world!" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/todo">ToDo</Link>
        </li>
        {role === "admin" && (
          <li>
            <Link to="/user">Users</Link>
          </li>
        )}
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AppNavbar;
