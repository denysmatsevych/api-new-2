import React from "react";

import { useRenderCount } from "../../../hooks/useRenderCount";

interface TodoTitleInputProps {
  todoTitle: string;
  setTodoTitle: (title: string) => void;
}

const TodoTitleInputComponent = ({ todoTitle, setTodoTitle }: TodoTitleInputProps) => {
  const renderCount = useRenderCount();

  const memoizedSetTodoTitle = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    [setTodoTitle]
  );

  return (
    <div>
      <input
        type="text"
        value={todoTitle}
        onChange={memoizedSetTodoTitle}
      />
      <h5>{renderCount}</h5>
    </div>
  );
};

const TodoTitleInput = React.memo(TodoTitleInputComponent);

export default TodoTitleInput;
