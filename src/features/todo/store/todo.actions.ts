import { Todo } from "../service/todo.service";

type TodoPayloadTypes =
  | Todo[]
  | Todo
  | number
  | boolean
  | string
  | { id: number; title: string }
  | null;

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

  SET_TODO_TABLE_LOADING = "SET_TODO_TABLE_LOADING",
  SET_TODO_TABLE_ERROR = "SET_TODO_TABLE_ERROR",
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

export const setTodoTableLoadingAction = (loading: boolean): TodoAction => ({
  type: TodoActionTypes.SET_TODO_TABLE_LOADING,
  payload: loading,
});

export const setTodoTableErrorAction = (error: string | null): TodoAction => ({
  type: TodoActionTypes.SET_TODO_TABLE_ERROR,
  payload: error,
});
