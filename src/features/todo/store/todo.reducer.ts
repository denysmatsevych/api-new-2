import { Todo } from "../service/todo.service";
import { TodoAction, TodoActionTypes } from "./todo.actions";

export interface TodoState {
  error: string | null;
  loading: boolean;
  todoList: Todo[];
}

export const initialTodoState: TodoState = {
  error: null,
  loading: false,
  todoList: [],
};

export const todoReducer = (
  state: TodoState = initialTodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload as Todo],
      };
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
    case TodoActionTypes.SET_TODO_LIST:
      return {
        ...state,
        todoList: action.payload as Todo[],
      };
    case TodoActionTypes.TOGGLE_TODO: {
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    }
    case TodoActionTypes.SET_TODO_TABLE_LOADING: {
      return {
        ...state,
        loading: action.payload as boolean,
      };
    }
    case TodoActionTypes.SET_TODO_TABLE_ERROR: {
      return {
        ...state,
        error: action.payload as string,
      };
    }
    default:
      return state;
  }
};
