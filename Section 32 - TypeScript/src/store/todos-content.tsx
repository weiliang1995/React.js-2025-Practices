import React from "react";
import Todo from "../models/todo";
import { useState } from "react";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodoContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  function handleAdd(todoText: string) {
    const newTodo = new Todo(todoText);
    setTodos((prevState) => {
      return prevState.concat(newTodo);
    });
  }

  function handleDelete(todoId: string) {
    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== todoId);
    });
  }

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: handleAdd,
    removeTodo: handleDelete,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodoContextProvider;
