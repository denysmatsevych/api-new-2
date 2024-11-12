import { useCallback, useEffect, useReducer, useState } from "react";

import { AxiosError } from "axios";

import { TodoService } from "../service/todo.service";
import { initialTodoState, todoReducer } from "../store/todo.reducer";
import { deleteTodoAction } from "../store/todo.actions";

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

        const todos = await todoService.getPaginatedTodos(1000, 0);

        if (isMounted) {
          setTodoList(todos.todos);
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

        setTodoList((prev) =>
          prev.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                todo: todoTitle,
              };
            }

            return todo;
          })
        );
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
