import { memo } from "react";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { Todo } from "../../service/todo.service";
import TodoTableRow from "./TodoTableRow";

interface TodoTableProps {
  todoList: Todo[];
  onTodoItemDelete: (id: number) => void;
  onSaveTodoButtonClick: (todoTitle: string, id: number) => void;
}

const TodoTableComponent = ({
  todoList,
  onTodoItemDelete,
  onSaveTodoButtonClick,
}: TodoTableProps) => {
  const renderCount = useRenderCount();

  return (
    <>
      <h5>TodoTable count: {renderCount}</h5>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>User Id</th>
            <th>Actions</th>
            <th>Render Count</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo) => (
            <TodoTableRow
              key={todo.id}
              todo={todo}
              onTodoItemDelete={onTodoItemDelete}
              onSaveTodoButtonClick={onSaveTodoButtonClick}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const TodoTable = memo(TodoTableComponent);

export default TodoTable;
