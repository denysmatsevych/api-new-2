import { createContext } from "react";

import { TodoState } from "../store/todo.reducer";

interface ITodoContext extends TodoState {
  error: string | null;
  loading: boolean;
}

interface ITodoDispatchContext {
  memoizedTodoItemDeleteButtonClickCallback: (id: number) => Promise<void>;
  memoizedSaveTodoButtonClickCallback: (title: string, id: number) => void;
}

const initialTodoContext: ITodoContext = {
  error: null,
  loading: false,
  todoList: [],
};

export const TodoContext = createContext<ITodoContext>(initialTodoContext);

export const TodoDispatchContext = createContext<ITodoDispatchContext | null>(
  null
);
