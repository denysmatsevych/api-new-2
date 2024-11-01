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
    }

    fetchTodos();

    return () => {
      isMounted = false;
      abortController.abort();
    }
  }, []);

  return (
    <div>
       {loading && <Loading />}
       {error && <ErrorMessage error={error} />}
       <TodoTable todoList={todoList} />
    </div>
  )
}

export default TodoTableContainer