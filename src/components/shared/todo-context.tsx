import { Todo } from "@prisma/client";
import axios from "axios";
import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  todo: Todo[];
  setTodo: React.Dispatch<SetStateAction<Todo[]>>;
  getTodo: () => void;
}

export const TodoContext = createContext<ContextProps>(undefined!);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const getTodo = async () => {
    const res = await axios.get("/api/todo");

    if (res.status === 200) {
      setTodo(res.data);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <TodoContext.Provider value={{ todo, setTodo, getTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
export default TodoProvider;
