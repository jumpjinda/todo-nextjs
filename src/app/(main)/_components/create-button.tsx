"use client";

import uesCreateTodo from "@/hooks/create-todo-hook";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

const CreateButton = () => {
  const { data: session } = useSession();
  const { onOpen, onClose } = uesCreateTodo();
  const pathname = usePathname();

  if (pathname === "/") return;

  if (!session) return;

  return (
    <div
      onClick={onOpen}
      className="w-fit h-fit absolute right-0 cursor-pointer z-10"
    >
      <FaPlus
        size={40}
        className="text-white border p-2 rounded-full"
      />
    </div>
  );
};
export default CreateButton;
