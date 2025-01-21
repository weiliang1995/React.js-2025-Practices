import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import TodoContextProvider from "./store/todos-content";

function App() {
  return (
    <TodoContextProvider>
      <NewTodo/>
      <Todos/>
    </TodoContextProvider>
  );
}

export default App;
