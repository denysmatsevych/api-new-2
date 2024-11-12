import { Todo } from "../service/todo.service";
import { TodoAction, TodoActionTypes } from "./todo.actions";

export interface TodoState {
  todoList: Todo[];
}

export const initialTodoState: TodoState = {
  todoList: [],
};

export const todoReducer = (
  state = initialTodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.SET_TODO_LIST: {
      return {
        ...state,
        todoList: action.payload as Todo[],
      };
    }
    case TodoActionTypes.DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== action.payload),
      };
    case TodoActionTypes.UPDATE_TODO_TITLE: {
      const payload = action.payload as { id: number; title: string };

      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              todo: payload.title,
            };
          }

          return todo;
        }),
      };
    }
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload as Todo],
      };
    default:
      return state;
  }
};
