"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AllTasksPage = () => {
  const { data: session } = useSession();
  const [todo, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    const getTest = async () => {
      if (session?.user) {
        const res = await axios.put("/api/user", { email: session.user.email });

        if (res.status === 200) {
          setTodo(res.data);
        }
      }
    };

    getTest();
  }, []);

  console.log(todo.length);

  return (
    <>
      {todo.length > 0 &&
        todo.map((item) => (
          <div className="bg-neutral-700 h-52 rounded-xl border border-neutral-500 p-3 flex flex-col justify-between">
            <div>
              <header>{item.title}</header>
              <div>{item.description}</div>
            </div>
            <div>
              <div>{new Date(item.updatedAt).toLocaleString()}</div>
              <div className="flex justify-between">
                <div>{item.status}</div>
                <div>handle</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default AllTasksPage;
