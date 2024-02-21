"use client";

import uesCreateTodo from "@/hooks/create-todo-hook";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const CreateButton = () => {
  const { data: session } = useSession();
  const { onOpen } = uesCreateTodo();
  const pathname = usePathname();

  if (pathname === "/") return;

  if (!session) return;

  return (
    <div
      onClick={onOpen}
      className="w-fit h-fit fixed right-5 md:right-12 cursor-pointer z-10 bg-neutral-700 rounded-full"
    >
      <FaPlus
        size={40}
        className="text-white border p-2 rounded-full transition-all duration-300 hover:scale-110"
      />
    </div>
  );
};
export default CreateButton;
