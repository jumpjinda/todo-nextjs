import uesCreateTodo from "@/hooks/create-todo-hook";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const AddNewTask = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { onOpen, onClose } = uesCreateTodo();

  if (!session) return;

  if (pathname === "/") return;

  return (
    <div
      onClick={onOpen}
      className="h-52 rounded-xl border border-dashed border-neutral-500 p-3 flex items-center justify-center text-neutral-300 font-semibold cursor-pointer"
    >
      + Add New Task
    </div>
  );
};
export default AddNewTask;
