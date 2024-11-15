import React, { useCallback, useMemo } from "react";

import { useTodoTableStore } from "../hooks/useTodoTableStore";
import { TodoContext, TodoDispatchContext } from "./todo.context";

interface TodoTableProviderProps {
  children: React.ReactNode;
}

const TodoTableProvider = ({ children }: TodoTableProviderProps) => {
  const {
    loading,
    error,
    memoizedTodoItemDeleteButtonClickCallback,
    memoizedSaveTodoButtonClickCallback,
    todoList,
  } = useTodoTableStore();

  const memoizedGetTodoRowByIdCallback = useCallback(
    (id: number) => {
      const todo = todoList.find((todo) => todo.id === id);

      if (!todo) {
        return null;
      }

      return todo;
    },
    [todoList],
  );

  const memoizedValue = useMemo(() => {
    return {
      loading,
      error,
      todoList,
    };
  }, [loading, error, todoList]);

  const memoizedDispatch = useMemo(() => {
    return {
      memoizedTodoItemDeleteButtonClickCallback,
      memoizedSaveTodoButtonClickCallback,
      memoizedGetTodoRowByIdCallback,
    };
  }, [
    memoizedTodoItemDeleteButtonClickCallback,
    memoizedSaveTodoButtonClickCallback,
    memoizedGetTodoRowByIdCallback,
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
