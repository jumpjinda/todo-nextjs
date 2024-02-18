import uesCreateTodo from "@/hooks/create-todo-hook";
import { IoClose } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pageRoute } from "@/lib/page-route";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";

const CreateTodoModal = () => {
  const { data: session } = useSession();
  const { isOpen, onClose } = uesCreateTodo();

  const createTodoFormSchema = z.object({
    title: z.string().min(2, { message: "Minimum character is 2" }),
    description: z.string().min(2, { message: "Minimum character is 2" }),
    category: z.string().min(1, { message: "Please select a category" }),
  });

  const form = useForm<z.infer<typeof createTodoFormSchema>>({
    resolver: zodResolver(createTodoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createTodoFormSchema>) => {
    const res = await axios.post("/api/todo", { ...values, session });
    console.log(res.data);
  };

  if (isOpen) {
    return (
      <div className="absolute w-screen h-screen bg-black/70 z-20 flex items-center justify-center">
        <div className="relative bg-neutral-300 w-[80%] min-h-[80%] rounded-lg p-5">
          <div
            onClick={onClose}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <IoClose size={30} />
          </div>
          <header className="w-full flex items-center justify-center text-2xl font-bold">
            Create Todo
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-xl">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your title here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-xl">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your description here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-xl">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pageRoute
                          // We don't need Home and All Tasks category, so we filtered out
                          .filter(
                            (item) =>
                              item.label !== "All Tasks" &&
                              item.label !== "Home" &&
                              item.label !== "Completed!"
                          )
                          .map((filtered) => (
                            <SelectItem value={filtered.route}>
                              {filtered.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-rose-500 mt-5"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
};
export default CreateTodoModal;
