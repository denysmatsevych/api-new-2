import PageTitle from "../../../components/layout/PageTitle";
import TodoTableContainer from "./table/TodoTableContainer";

const TodoPage = () => {
  return (
    <div>
      <PageTitle title="Todo List" />
      <TodoTableContainer />
    </div>
  );
};

export default TodoPage;
