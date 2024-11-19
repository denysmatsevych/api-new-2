// React imports
import { useCallback, useEffect, useReducer } from "react";

// External (3rd-party) imports
import { AxiosError } from "axios";

// Internal (local) imports
import { TodoService } from "../service/todo.service";
import {
  deleteTodoAction,
  setTodoListAction,
  setTodoTableErrorAction,
  setTodoTableLoadingAction,
  updateTodoTitleAction,
} from "../store/todo.actions";
import { initialTodoState, todoReducer } from "../store/todo.reducer";

export const useTodoTableStore = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  useEffect(() => {
    let isMounted = true;

    const abortController = new AbortController();
    const signal = abortController.signal;

    const todoService = new TodoService(signal);

    dispatch(setTodoTableLoadingAction(true));
    dispatch(setTodoTableErrorAction(null));

    const fetchTodos = async () => {
      try {
        const response = await todoService.getPaginatedTodos(1000, 0);

        if (isMounted) {
          dispatch(setTodoListAction(response.todos));
        }
      } catch (error) {
        dispatch(setTodoTableErrorAction((error as AxiosError).message));
      } finally {
        dispatch(setTodoTableLoadingAction(false));
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
        dispatch(setTodoTableLoadingAction(true));

        await new TodoService().deleteTodoById(id);

        dispatch(deleteTodoAction(id));

        dispatch(setTodoTableLoadingAction(false));
      } catch (error) {
        dispatch(setTodoTableErrorAction((error as AxiosError).message));
        dispatch(setTodoTableLoadingAction(false));
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
        dispatch(setTodoTableErrorAction((error as AxiosError).message));
      }
    },
    []
  );

  return {
    todoList: state.todoList,
    loading: state.loading,
    error: state.error,
    memoizedTodoItemDeleteButtonClickCallback,
    memoizedSaveTodoButtonClickCallback,
  };
};
