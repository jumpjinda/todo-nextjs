import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { pageRoute } from "@/lib/page-route";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@prisma/client";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { z } from "zod";

interface Props {
  item: Todo;
  router: AppRouterInstance;
  getTodo: () => void;
}

const EditTodoPopup = ({ item, router, getTodo }: Props) => {
  const editTodoFormSchema = z.object({
    title: z.string().min(2, { message: "Minimum character is 2" }),
    description: z.string().min(2, { message: "Minimum character is 2" }),
    category: z.string().min(1, { message: "Please select a category" }),
  });

  const form = useForm<z.infer<typeof editTodoFormSchema>>({
    resolver: zodResolver(editTodoFormSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
      category: item.category,
    },
  });

  const onSubmit = async (values: z.infer<typeof editTodoFormSchema>) => {
    const res = await axios.put(`/api/todo/${item.id}`, {
      ...values,
      id: item.id,
    });

    if (res.status === 200) {
      router.refresh();
      getTodo();
    }
  };

  return (
    <Dialog key={item.id}>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:scale-125 transition-all duration-300"
      >
        <CiEdit size={20} />
      </DialogTrigger>
      <DialogContent>
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
                        <SelectValue placeholder={item.category} />
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
                          <SelectItem
                            key={filtered.route}
                            value={filtered.value}
                          >
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
              className="w-full bg-green-500 mt-5"
            >
              Edit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditTodoPopup;
