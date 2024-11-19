import PageTitle from "../../components/layout/PageTitle";
import TodoTableContainer from "./components/table/TodoTableContainer";
import TodoTableProvider from "./context/TodoTableProvider";

const TodoPage = () => {
  return (
    <TodoTableProvider>
      <div>
        <PageTitle title="Todo List" />
        <TodoTableContainer />
      </div>
    </TodoTableProvider>
  );
};

export default TodoPage;
