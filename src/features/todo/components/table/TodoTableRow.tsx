import React, { useCallback, useState } from "react";

import { isEqual } from "lodash";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { Todo } from "../../service/todo.service";

interface TodoTableRowProps {
  todo: Todo;
  onTodoItemDelete: (id: number) => void;
  onSaveTodoButtonClick: (todoTitle: string, id: number) => void;
}

const TodoTableRowComponent = ({
  todo,
  onTodoItemDelete,
  onSaveTodoButtonClick,
}: TodoTableRowProps) => {
  const renderCount = useRenderCount();

  const [todoTitle, setTodoTitle] = useState(todo.todo);

  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetTodoTitleCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    [],
  );

  const memoizedSetIsEditModeCallback = useCallback(
    (isEdit: boolean) => {
      setIsEditMode(isEdit);
    },
    [],
  );

  // TODO: fix saving new title to todo item
  const memoizedSaveTodoButtonClickCallback = useCallback(
    () => {
      onSaveTodoButtonClick(todoTitle, todo.id);
      setIsEditMode(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todo.id, onSaveTodoButtonClick],
  );

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>
        {isEditMode ? (
          <input
            style={{
              width: "100%",
            }}
            type="text"
            value={todoTitle}
            onChange={memoizedSetTodoTitleCallback}
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
          {isEditMode ? (
            <button onClick={memoizedSaveTodoButtonClickCallback}>Save</button>
          ) : (
            <button onClick={() => memoizedSetIsEditModeCallback(true)}>Edit</button>
          )}
          {isEditMode ? (
            <button onClick={() => memoizedSetIsEditModeCallback(false)}>Cancel</button>
          ) : (
            <button onClick={() => onTodoItemDelete(todo.id)}>Delete</button>
          )}
        </div>
      </td>
      <td>
        <h5>Row render count: {renderCount}</h5>
      </td>
    </tr>
  );
};

const TodoTableRow = React.memo(
  TodoTableRowComponent,
  (prevProps, nextProps) => {
    return (
      isEqual(prevProps.todo, nextProps.todo)
    );
  }
);

export default TodoTableRow;
