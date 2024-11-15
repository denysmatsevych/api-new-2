import { memo } from "react";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { useTodoContext } from "../../hooks/useTodoTableContext";
import TodoTableRow from "./TodoTableRow";

const TodoTableComponent = () => {
  const renderCount = useRenderCount();

  const {
    todoList,
  } = useTodoContext();

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
              todoId={todo.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const TodoTable = memo(TodoTableComponent);

export default TodoTable;
