import { Todo } from "../service/todo.service";

export type TodoActionPayloadTypes =
  | Todo[]
  | Todo
  | number
  | { id: number; title: string };

export interface TodoAction {
  type: TodoActionTypes;
  payload: TodoActionPayloadTypes;
}

export enum TodoActionTypes {
  SET_TODO_LIST = "SET_TODO_LIST",
  ADD_TODO = "ADD_TODO",
  UPDATE_TODO_TITLE = "UPDATE_TODO_TITLE",
  DELETE_TODO = "DELETE_TODO",
}

export const setTodoListAction = (todos: Todo[]): TodoAction => {
  return {
    type: TodoActionTypes.SET_TODO_LIST,
    payload: todos,
  };
};

export const addTodoAction = (todo: Todo): TodoAction => {
  return {
    type: TodoActionTypes.ADD_TODO,
    payload: todo,
  };
};

export const updateTodoTitleAction = (
  id: number,
  title: string
): TodoAction => {
  return {
    type: TodoActionTypes.UPDATE_TODO_TITLE,
    payload: {
      id,
      title,
    },
  };
};

export const deleteTodoAction = (id: number): TodoAction => {
  return {
    type: TodoActionTypes.DELETE_TODO,
    payload: id,
  };
};
