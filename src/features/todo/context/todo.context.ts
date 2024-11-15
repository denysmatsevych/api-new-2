import { createContext } from "react";

import { Todo } from "../service/todo.service";
import { TodoState } from "../store/todo.reducer";

interface ITodoContext extends TodoState {
  error: string | null;
  loading: boolean;
}

interface ITodoDispatchContext {
  memoizedTodoItemDeleteButtonClickCallback: (id: number) => Promise<void>;
  memoizedSaveTodoButtonClickCallback: (todoTitle: string, id: number) => void;
  memoizedGetTodoRowByIdCallback: (id: number) => Todo | null;
}

const initialTodoContext: ITodoContext = {
  todoList: [],
  error: null,
  loading: false,
};

export const TodoContext = createContext<ITodoContext>(initialTodoContext);

export const TodoDispatchContext = createContext<ITodoDispatchContext | null>(
  null
);
