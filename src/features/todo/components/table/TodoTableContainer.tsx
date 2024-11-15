import ErrorMessage from "../../../../components/layout/ErrorMessage";
import Loading from "../../../../components/layout/Loading";
import { useRenderCount } from "../../../../hooks/useRenderCount";
import TodoTableProvider from "../../context/TodoTableProvider";
import {
  useTodoContext,
  useTodoDispatchContext,
} from "../../context/useTodoTableContext";
import TodoTable from "./TodoTable";

const TodoTableContainer = () => {
  const renderCount = useRenderCount();

  const { todoList, error, loading } = useTodoContext();

  const {
    memoizedSaveTodoButtonClickCallback,
    memoizedTodoItemDeleteButtonClickCallback,
  } = useTodoDispatchContext();

  return (
    <TodoTableProvider>
      <div>
        <h5>TodoTableContainer count: {renderCount}</h5>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <TodoTable
          todoList={todoList}
          onTodoItemDelete={memoizedTodoItemDeleteButtonClickCallback}
          onSaveTodoButtonClick={memoizedSaveTodoButtonClickCallback}
        />
      </div>
    </TodoTableProvider>
  );
};

export default TodoTableContainer;
