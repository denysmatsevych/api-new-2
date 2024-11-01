import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import ErrorMessage from '../../../../components/layout/ErrorMessage';
import Loading from '../../../../components/layout/Loading';
import { Todo, TodoService } from '../../service/todo.service';
import TodoTable from './TodoTable';

const TodoTableContainer = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editTodo, setEditTodo] = useState<Todo | null>(null);

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

  const handleTodoItemDelete = async (id: number) => {
    try {
      setLoading(true);

      await new TodoService().deleteTodoById(id);

      setTodoList((prev) => prev.filter((todo) => todo.id !== id));

      setLoading(false);
    } catch (error) {
      setError((error as AxiosError).message);
      setLoading(false);
    }
  };

  const handleSaveTodoButtonClick = async () => {
    try {
      setLoading(true);

      if (!editTodo) {
        return;
      }

      await new TodoService().updateTodo(editTodo);

      setTodoList((prev) =>
        prev.map((todo) => {
          if (todo.id === editTodo.id) {
            return {
              ...todo,
              todo: editTodo.todo,
            };
          }

          return todo;
        })
      );
    } catch (error) {
      setError((error as AxiosError).message);
    }
  };

  const handleEditButtonClick = (row: Todo) => {
    setEditTodo(row);
  };

  const handleTodoTitleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setEditTodo((prev) => {
      if (!prev) {
        return prev;
      }

      if (prev.id !== id) {
        return prev;
      }

      return {
        ...prev,
        todo: event.target.value,
      };
    });
  };

  const handleCancelEditTodo = () => {
    setEditTodo(null);
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <TodoTable
        todoList={todoList}
        editTodo={editTodo}
        onTodoItemDelete={handleTodoItemDelete}
        onEditButtonClick={handleEditButtonClick}
        onSaveTodoButtonClick={handleSaveTodoButtonClick}
        onTodoTitleChange={handleTodoTitleChange}
        onCancelEditTodo={handleCancelEditTodo}
      />
    </div>
  );
};

export default TodoTableContainer;
