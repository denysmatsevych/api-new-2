import { useContext } from "react";
import { TodoContext, TodoDispatchContext } from "./todo.context";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  return context;
};

export const useTodoDispatchContext = () => {
  const context = useContext(TodoDispatchContext);

  if (!context) {
    throw new Error(
      "useTodoDispatchContext must be used within a TodoDispatchContextProvider"
    );
  }

  return context;
};
