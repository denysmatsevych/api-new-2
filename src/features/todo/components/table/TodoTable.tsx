import { ChangeEvent } from "react";

import { Todo } from "../../service/todo.service";

interface TodoTableProps {
  todoList: Todo[];
  editTodo: Todo | null;
  onTodoItemDelete: (id: number) => void;
  onEditButtonClick: (row: Todo) => void;
  onCancelEditTodo: () => void;
  onTodoTitleChange: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  onSaveTodoButtonClick: () => void;
}

const TodoTable = ({
  todoList,
  editTodo,
  onTodoItemDelete,
  onEditButtonClick,
  onTodoTitleChange,
  onSaveTodoButtonClick,
  onCancelEditTodo,
}: TodoTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>Completed</th>
          <th>User Id</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>
              {editTodo?.id === todo.id ? (
                <input
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={editTodo.todo}
                  onChange={(event) => onTodoTitleChange(event, todo.id)}
                />
              ) : (
                todo.todo
              )}
            </td>
            <td>{todo.completed ? "Yes" : "No"}</td>
            <td>{todo.userId}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  gap: "1em",
                }}
              >
                {editTodo?.id === todo.id ? (
                  <button onClick={onSaveTodoButtonClick}>Save</button>
                ) : (
                  <button onClick={() => onEditButtonClick(todo)}>Edit</button>
                )}
                {editTodo?.id === todo.id ? (
                  <button onClick={() => onCancelEditTodo()}>
                    Cancel
                  </button>
                ) : (
                  <button onClick={() => onTodoItemDelete(todo.id)}>
                    Delete
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
