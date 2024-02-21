"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddNewTask from "../_components/add-new-task";
import EditTodoPopup from "../_components/edit-todo-popup";
import { useRouter } from "next/navigation";
import { TodoContext } from "@/components/shared/todo-context";
import DeleteTodo from "../_components/delete-todo";

const CompletedPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { todo, setTodo, getTodo } = useContext(TodoContext);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleStatus = async (itemId: string, status: string) => {
    const res = await axios.put("/api/todo", {
      itemId: itemId,
      status: status,
    });

    if (res.status === 200) {
      // Spread state to new list
      const newTodo = [...todo];
      // Find item we want to edit
      const newItem = newTodo.find((item) => item.id === itemId);

      if (newItem) {
        // Change status
        newItem.status = res.data.status;
        // Set new list to state
        setTodo(newTodo);
      }
      // console.log(todo);
    }
  };

  const handleDelete = async (itemId: string) => {
    const res = await axios.delete(`/api/todo/${itemId}`);

    if (res.status === 200) {
      const newTodo = todo.filter((item) => item.id !== itemId);

      if (newTodo) {
        setTodo(newTodo);
      }
    }
  };

  if (isLoading) return;

  return (
    <>
      {todo.length > 0 &&
        todo
          .filter((item) => item.status === "Completed")
          .map((item) => (
            <div
              key={item.id}
              className="bg-neutral-700 h-52 rounded-xl border border-neutral-500 p-3 flex flex-col justify-between text-white"
            >
              <div>
                <header className="text-xl font-semibold mb-2">
                  {item.title}
                </header>
                <div>{item.description}</div>
              </div>
              <div>
                <div className="mb-2 italic text-neutral-300 flex justify-between">
                  <div>{new Date(item.updatedAt).toLocaleString()}</div>
                  <div className="font-semibold text-rose-500">
                    {item.category.replace("/", "")}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleStatus(item.id, item.status)}
                    className={cn(
                      "p-2 rounded-lg hover:scale-110 transition-all duration-300",
                      item.status === "Incomplete" && "bg-red-500",
                      item.status === "Completed" && "bg-green-500"
                    )}
                  >
                    {item.status}
                  </button>
                  <div className="flex gap-x-5">
                    <EditTodoPopup
                      item={item}
                      router={router}
                      getTodo={getTodo}
                    />
                    <DeleteTodo
                      todo={item}
                      handleDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      <AddNewTask />
    </>
  );
};
export default CompletedPage;
