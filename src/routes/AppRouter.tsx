import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import NotFoundPage from "../components/NotFoundPage";
import UnauthorizedPage from "../components/UnauthorizedPage";
import LoginPage from "../features/auth/LoginPage";
import BookReviewsPage from "../features/books/components/BookReviewsPage";
import HomePage from "../features/home/HomePage";
import TodoPage from "../features/todo/TodoPage";
import UsersPage from "../features/users/UsersPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <BookReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
