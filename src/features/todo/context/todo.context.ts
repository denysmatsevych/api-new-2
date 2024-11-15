import { createContext } from "react";

import { initialTodoState, TodoState } from "../store/todo.reducer";

interface TodoContext extends TodoState {
  loading: boolean;
  error: string | null;
}

interface TodoDispatch {
  memoizedSaveTodoButtonClickCallback: (todoTitle: string, id: number) => void;
  memoizedTodoItemDeleteButtonClickCallback: (id: number) => Promise<void>;
}

const initialTodoContext: TodoContext = {
  ...initialTodoState,
  loading: false,
  error: null,
};

export const TodoContext = createContext<TodoContext>(initialTodoContext);

export const TodoDispatchContext = createContext<TodoDispatch | null>(null);
