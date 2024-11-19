import React, { useMemo } from 'react'

import { useTodoTableStore } from '../hooks/useTodoTableStore'
import { TodoContext, TodoDispatchContext } from './todo.context'

interface ITodoTableProviderProps {
  children: React.ReactNode
}

const TodoTableProvider = ({
  children
}: ITodoTableProviderProps) => {
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
    }
  }, [error, loading, todoList]);

  const memoizedDispatchValue = useMemo(() => {
    return {
      memoizedSaveTodoButtonClickCallback,
      memoizedTodoItemDeleteButtonClickCallback,
    }
  }, [memoizedSaveTodoButtonClickCallback, memoizedTodoItemDeleteButtonClickCallback]);

  return (
    <TodoContext.Provider value={memoizedValue}>
      <TodoDispatchContext.Provider value={memoizedDispatchValue}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  )
}

export default TodoTableProvider