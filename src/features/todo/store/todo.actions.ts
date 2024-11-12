import { Todo } from "../service/todo.service";

type TodoPayloadTypes = Todo[] | Todo | number | { id: number; title: string };

export interface TodoAction {
  type: TodoActionTypes;
  payload: TodoPayloadTypes;
}

export enum TodoActionTypes {
  ADD_TODO = "ADD_TODO",
  TOGGLE_TODO = "TOGGLE_TODO",
  DELETE_TODO = "DELETE_TODO",
  UPDATE_TODO_TITLE = "UPDATE_TODO_TITLE",
  SET_TODO_LIST = "SET_TODO_LIST",
}

export const addTodoAction = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.ADD_TODO,
  payload: todo,
});

export const toggleTodoAction = (id: number): TodoAction => ({
  type: TodoActionTypes.TOGGLE_TODO,
  payload: id,
});

export const deleteTodoAction = (id: number): TodoAction => ({
  type: TodoActionTypes.DELETE_TODO,
  payload: id,
});

export const updateTodoTitleAction = (
  id: number,
  title: string
): TodoAction => ({
  type: TodoActionTypes.UPDATE_TODO_TITLE,
  payload: { id, title },
});

export const setTodoListAction = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.SET_TODO_LIST,
  payload: todos,
});
