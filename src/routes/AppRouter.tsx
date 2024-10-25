import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../features/auth/LoginPage";
import BookReviewsPage from "../features/books/components/BookReviewsPage";
import HomePage from "../features/home/HomePage";
import TodoPage from "../features/todo/components/TodoPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookReviewsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
