import { useContext } from "react";

import { TodoContext, TodoDispatchContext } from "../context/todo.context";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoTableProvider");
  }

  return context;
};

export const useTodoDispatchContext = () => {
  const context = useContext(TodoDispatchContext);

  if (!context) {
    throw new Error(
      "useTodoDispatchContext must be used within a TodoTableProvider"
    );
  }

  return context;
};
