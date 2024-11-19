import ErrorMessage from "../../../../components/layout/ErrorMessage";
import Loading from "../../../../components/layout/Loading";
import { useRenderCount } from "../../../../hooks/useRenderCount";
import { useTodoContext } from "../../hooks/useTodoTableContext";
import TodoTable from "./TodoTable";

const TodoTableContainer = () => {
  const renderCount = useRenderCount();

  const { error, loading } = useTodoContext();

  return (
    <div>
      <h5>TodoTableContainer count: {renderCount}</h5>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      <TodoTable />
    </div>
  );
};

export default TodoTableContainer;
