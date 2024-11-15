import React, { useMemo } from "react";

import { TodoContext, TodoDispatchContext } from "./todo.context";
import { useTodoTableStore } from "../hooks/useTodoTableStore";

interface TodoContextDispatchProviderProps {
  children: React.ReactNode;
}

const TodoTableProvider = ({ children }: TodoContextDispatchProviderProps) => {
  const {
    error,
    loading,
    memoizedSaveTodoButtonClickCallback,
    memoizedTodoItemDeleteButtonClickCallback,
    todoList,
  } = useTodoTableStore();

  const memoizedValue = useMemo(() => {
    return {
      error,
      loading,
      todoList,
    };
  }, [error, loading, todoList]);

  const memoizedDispatch = useMemo(() => {
    return {
      memoizedSaveTodoButtonClickCallback,
      memoizedTodoItemDeleteButtonClickCallback,
    };
  }, [
    memoizedSaveTodoButtonClickCallback,
    memoizedTodoItemDeleteButtonClickCallback,
  ]);

  return (
    <TodoContext.Provider value={memoizedValue}>
      <TodoDispatchContext.Provider value={memoizedDispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export default TodoTableProvider;
