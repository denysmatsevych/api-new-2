import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    userName: "admin",
    password: "admin",
    role: "admin",
  },
  {
    userName: "user",
    password: "user",
    role: "user",
  },
];

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserName(event.target.value);
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: HTMLFormElement) => {
    event.preventDefault();
    // API call to authenticate user

    // Simulate API call
    const user = users.find((user) => user.userName === userName);

    if (!user) {
      alert("User does not exist");
      return;
    }

    if (user.password !== password) {
      alert("Invalid password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    // Redirect user based on role
    if (user.role === "admin") {
      navigate("/users");

      return;
    }

    if (user.role === "user") {
      navigate("/");

      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "960px",
      }}
    >
      <h1>Login</h1>
      <div
        style={{
          padding: "1.5em",
          border: "1px solid #ccc",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={userName}
              onChange={handleUserNameInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="paswword"
              type="password"
              value={password}
              onChange={handlePasswordInputChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
