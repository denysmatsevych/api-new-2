import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import { useRenderCount } from '../../../../hooks/useRenderCount';
import { Todo, TodoService } from '../../service/todo.service';
import TodoTable from './TodoTable';

const TodoTableContainer = () => {
  const renderCount = useRenderCount();

  const [todoList, setTodoList] = useState<Todo[]>([]);
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

  const memoizedHandleTodoItemDeleteCallback = useCallback(
    async (id: number) => {
      try {
        setLoading(true);

        await new TodoService().deleteTodoById(id);

        setTodoList((prev) => prev.filter((todo) => todo.id !== id));

        setLoading(false);
      } catch (error) {
        setError((error as AxiosError).message);
        setLoading(false);
      }
    },
    [],
  );

  const memozedHandleSaveTodoButtonClick = useCallback(async (newTitle: string, id: number) => {
    try {
      // setLoading(true);

      if (!newTitle) {
        return;
      }

      // await new TodoService().updateTodo(editTodo);

      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              todo: newTitle,
            };
          }

          return todo;
        })
      );
    } catch (error) {
      setError((error as AxiosError).message);
    }
  }, []);

  return (
    <div>
      <h5>TodoTableContainer render count: {renderCount}</h5>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <TodoTable
        todoList={todoList}
        onTodoItemDelete={memoizedHandleTodoItemDeleteCallback}
        onSaveTodoButtonClick={memozedHandleSaveTodoButtonClick}
      />
    </div>
  );
};

export default TodoTableContainer;
