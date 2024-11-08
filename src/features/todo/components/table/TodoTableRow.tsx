import React, { useCallback, useState } from "react";

import { isEqual } from "lodash";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { Todo } from "../../service/todo.service";
import TodoTitleInput from "../TodoTitleInput";

interface TodoTableRowProps {
  todo: Todo;
  onTodoItemDelete: (id: number) => void;
  onSaveTodoButtonClick: (newTitle: string, id: number) => void;
}

const TodoTableRowComponent = ({
  todo,
  onTodoItemDelete,
  onSaveTodoButtonClick,
}: TodoTableRowProps) => {
  const renderCount = useRenderCount();

  const [todoTitle, setTodoTitle] = useState(todo.todo);

  const [isEdit, setIsEdit] = useState(false);

  const memoizedSetTodoTitle = useCallback(
    (title: string) => {
      setTodoTitle(title);
    },
    []
  );

  const memoizedSetIsEdit = useCallback((isEditMode: boolean) => {
    setIsEdit(isEditMode);
  }, []);

  const memoizedSaveButtonClick = useCallback(() => {
    onSaveTodoButtonClick(todoTitle, todo.id);
    setIsEdit(false);
  }, [onSaveTodoButtonClick, todoTitle, todo.id]);

  const memoizedDeleteTodoItem = useCallback(() => {
    onTodoItemDelete(todo.id);
  }, [todo.id, onTodoItemDelete]);

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>
        {isEdit ? (
          <TodoTitleInput todoTitle={todoTitle} setTodoTitle={memoizedSetTodoTitle} />
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
          {isEdit ? (
            <button onClick={memoizedSaveButtonClick}>Save</button>
          ) : (
            <button onClick={() => memoizedSetIsEdit(true)}>Edit</button>
          )}
          {isEdit ? (
            <button onClick={() => memoizedSetIsEdit(false)}>Cancel</button>
          ) : (
            <button onClick={memoizedDeleteTodoItem}>Delete</button>
          )}
        </div>
      </td>
      <td>
        <h5>TodoTableRow render count: {renderCount}</h5>
      </td>
    </tr>
  );
};

const TodoTableRow = React.memo(TodoTableRowComponent, (prev, next) => {
  return isEqual(prev.todo, next.todo);
});

export default TodoTableRow;
