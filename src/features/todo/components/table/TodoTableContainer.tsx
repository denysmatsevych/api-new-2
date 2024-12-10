import ErrorMessage from "../../../../components/layout/ErrorMessage";
import Loading from "../../../../components/layout/Loading";
import { useRenderCount } from "../../../../hooks/useRenderCount";
import { useTodoTableStore } from "../../hooks/useTodoTableStore";
import TodoTable from "./TodoTable";

const TodoTableContainer = () => {
  const renderCount = useRenderCount();

  const {
    error,
    loading,
    memoizedSaveTodoButtonClickCallback,
    memoizedTodoItemDeleteButtonClickCallback,
    todoList,
  } = useTodoTableStore();

  return (
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
  );
};

export default TodoTableContainer;
