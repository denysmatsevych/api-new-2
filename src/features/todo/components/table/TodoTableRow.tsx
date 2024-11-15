import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { useTodoDispatchContext } from "../../hooks/useTodoTableContext";
import TodoTitleInput from "../TodoTitleInput";

interface TodoTableRowProps {
  todoId: number;
}

const TodoTableRowComponent = ({ todoId }: TodoTableRowProps) => {
  const renderCount = useRenderCount();

  const {
    memoizedSaveTodoButtonClickCallback,
    memoizedTodoItemDeleteButtonClickCallback,
    memoizedGetTodoRowByIdCallback,
  } = useTodoDispatchContext();

  const todo = memoizedGetTodoRowByIdCallback(todoId);

  const memoizedTodoTitleValue = useMemo(() => todo?.todo ?? "", [todo?.todo]);

  const [todoTitle, setTodoTitle] = useState(memoizedTodoTitleValue);

  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetTodoTitleCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    []
  );

  const memoizedSetIsEditModeCallback = useCallback((isEdit: boolean) => {
    setIsEditMode(isEdit);
  }, []);

  const memoizedSaveTodoButtonClickHandlerCallback = useCallback(() => {
    if (!todo) {
      return;
    }

    memoizedSaveTodoButtonClickCallback(todoTitle, todo.id);
    setIsEditMode(false);
  }, [memoizedSaveTodoButtonClickCallback, todo, todoTitle]);

  const memoizedTodoItemDeleteCallback = useCallback(() => {
    if (!todo) {
      return;
    }

    memoizedTodoItemDeleteButtonClickCallback(todo.id);
  }, [memoizedTodoItemDeleteButtonClickCallback, todo]);

  if (!todo) {
    return null;
  }

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>
        {isEditMode ? (
          <TodoTitleInput
            title={todoTitle}
            onTodoTitleChange={memoizedSetTodoTitleCallback}
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
            <button onClick={memoizedSaveTodoButtonClickHandlerCallback}>
              Save
            </button>
          ) : (
            <button onClick={() => memoizedSetIsEditModeCallback(true)}>
              Edit
            </button>
          )}
          {isEditMode ? (
            <button onClick={() => memoizedSetIsEditModeCallback(false)}>
              Cancel
            </button>
          ) : (
            <button onClick={memoizedTodoItemDeleteCallback}>Delete</button>
          )}
        </div>
      </td>
      <td>{renderCount}</td>
    </tr>
  );
};

const TodoTableRow = memo(TodoTableRowComponent);

export default TodoTableRow;
