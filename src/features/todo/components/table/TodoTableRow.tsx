import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";

import { useRenderCount } from "../../../../hooks/useRenderCount";
import { Todo } from "../../service/todo.service";
import TodoTitleInput from "../TodoTitleInput";

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

  const memoizedTodoTitleValue = useMemo(() => todo.todo, [todo.todo]);

  const [todoTitle, setTodoTitle] = useState(memoizedTodoTitleValue);

  const [isEditMode, setIsEditMode] = useState(false);

  const memoizedSetTodoTitleCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
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

  const memoizedSaveTodoButtonClickCallback = useCallback(
    () => {
      onSaveTodoButtonClick(todoTitle, todo.id);
      setIsEditMode(false);
    },
    [onSaveTodoButtonClick, todo.id, todoTitle],
  );

  const memoizedTodoItemDeleteCallback = useCallback(
    () => {
      onTodoItemDelete(todo.id);
    },
    [onTodoItemDelete, todo.id],
  );

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
            <button onClick={memoizedSaveTodoButtonClickCallback}>Save</button>
          ) : (
            <button onClick={() => memoizedSetIsEditModeCallback(true)}>Edit</button>
          )}
          {isEditMode ? (
            <button onClick={() => memoizedSetIsEditModeCallback(false)}>Cancel</button>
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
