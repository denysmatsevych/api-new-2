// React imports
import { useCallback, useEffect, useReducer, useState } from "react";

// External (3rd-party) imports
import { AxiosError } from "axios";

// Internal (local) imports
import { TodoService } from "../service/todo.service";
import {
  deleteTodoAction,
  setTodoListAction,
  updateTodoTitleAction,
} from "../store/todo.actions";
import { initialTodoState, todoReducer } from "../store/todo.reducer";

export const useTodoTableStore = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const todoService = new TodoService(signal);

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await todoService.getPaginatedTodos(1000, 0);

        if (isMounted) {
          dispatch(setTodoListAction(response.todos));
        }
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const memoizedTodoItemDeleteButtonClickCallback = useCallback(
    async (id: number) => {
      try {
        setLoading(true);

        await new TodoService().deleteTodoById(id);

        dispatch(deleteTodoAction(id));

        setLoading(false);
      } catch (error) {
        setError((error as AxiosError).message);
        setLoading(false);
      }
    },
    []
  );

  const memoizedSaveTodoButtonClickCallback = useCallback(
    (todoTitle: string, id: number) => {
      try {
        if (!todoTitle) {
          return;
        }

        // setLoading(true);

        // await new TodoService().updateTodo(editTodo);

        dispatch(updateTodoTitleAction(id, todoTitle));
      } catch (error) {
        setError((error as AxiosError).message);
      }
    },
    []
  );

  return {
    todoList: state.todoList,
    loading,
    error,
    memoizedTodoItemDeleteButtonClickCallback,
    memoizedSaveTodoButtonClickCallback,
  };
};
