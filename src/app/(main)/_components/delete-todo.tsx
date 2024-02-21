import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Todo } from "@prisma/client";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  todo: Todo;
  handleDelete: (itemId: string) => void;
}

const DeleteTodo = ({ todo, handleDelete }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FaRegTrashAlt className="cursor-pointer hover:scale-125 transition-all duration-300" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to delete "{todo.title}" todo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(todo.id)}
            className="bg-rose-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteTodo;
