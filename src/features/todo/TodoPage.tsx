import PageTitle from "../../components/layout/PageTitle";
import TodoTableContainer from "./components/table/TodoTableContainer";
import TodoTableProvider from "./context/TodoTableProvider";

const TodoPage = () => {
  return (
    <div>
      <PageTitle title="Todo List" />
      <TodoTableProvider>
        <TodoTableContainer />
      </TodoTableProvider>
    </div>
  );
};

export default TodoPage;
