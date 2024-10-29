import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

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

        const todos = await todoService.getAllTodos();

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
       {loading && <p>Loading...</p>}
       {error && <p>Error: {error}</p>}
       <TodoTable todoList={todoList} />
    </div>
  )
}

export default TodoTableContainer