import React from "react";

import { Todo } from "../service/todo.service";

interface TodoTitleInputProps {
  editTodo: Todo | null;
  onTodoTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
}

const TodoTitleInput = ({
  editTodo,
  onTodoTitleChange,
 }: TodoTitleInputProps) => {
  if (!editTodo) {
    return null;
  }

  return (
    <input
      style={{
        width: "100%",
      }}
      type="text"
      value={editTodo?.todo}
      onChange={(event) => onTodoTitleChange(event, editTodo?.id)}
    />
  );
};

export default TodoTitleInput;
