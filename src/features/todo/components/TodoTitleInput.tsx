import React, { useCallback } from "react";

interface TodoTitleInputProps {
  title: string;
  onTodoTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const TodoTitleInputComponent = ({
  title,
  onTodoTitleChange,
}: TodoTitleInputProps) => {
  const memoizedTodoTitleChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onTodoTitleChange(event);
    },
    [onTodoTitleChange]
  );

  return (
    <input
      style={{
        width: "100%",
      }}
      type="text"
      value={title}
      onChange={memoizedTodoTitleChangeCallback}
    />
  );
};

const TodoTitleInput = React.memo(TodoTitleInputComponent);

export default TodoTitleInput;
