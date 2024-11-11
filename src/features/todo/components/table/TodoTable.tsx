import { memo } from "react";

import { isEqual } from "lodash";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { Todo } from "../../service/todo.service";
import TodoTableRow from "./TodoTableRow";

interface TodoTableProps {
  todoList: Todo[];
  onTodoItemDelete: (id: number) => void;
  onSaveTodoButtonClick: (newTitle: string, id: number) => void;
}

const TodoTableComponent = ({
  todoList,
  onTodoItemDelete,
  onSaveTodoButtonClick,
}: TodoTableProps) => {
  const renderCount = useRenderCount();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>User Id</th>
            <th>Actions</th>
            <th>Renders count</th>
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
      <h5>TodoTable render count: {renderCount}</h5>
    </>
  );
};

const TodoTable = memo(TodoTableComponent, (prev, next) => {
  return (
    isEqual(prev.todoList, next.todoList)
  );
});

export default TodoTable;
