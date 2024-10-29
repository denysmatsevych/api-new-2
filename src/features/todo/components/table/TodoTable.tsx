import { Todo } from "../../service/todo.service";

interface TodoTableProps {
  todoList: Todo[];
}

const TodoTable = ({
  todoList
}: TodoTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>Completed</th>
          <th>User Id</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.todo}</td>
            <td>{todo.completed ? "Yes" : "No"}</td>
            <td>{todo.userId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
