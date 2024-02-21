"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { signIn } from "next-auth/react";

interface Props {
  creatingUser: boolean;
  setCreatingUser: React.Dispatch<SetStateAction<boolean>>;
  userCreated: boolean;
  setUserCreated: React.Dispatch<SetStateAction<boolean>>;
  loggingIn: boolean;
  setLoggingIn: React.Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setDisable: React.Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({
  creatingUser,
  setCreatingUser,
  userCreated,
  setUserCreated,
  loggingIn,
  setLoggingIn,
  disable,
  setDisable,
}: Props) => {
  const [userDuplicate, setUserDuplicate] = useState(false);
  const [userCreateError, setUserCreateError] = useState("");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    name: z.string().min(3, { message: "Minimum character is 3" }),
    password: z.string().min(4, { message: "Minimum character is 4" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDisable(true);
    const res = await axios.post("/api/user", values);

    if (res.status === 202) {
      setUserDuplicate(true);
    }

    if (res.status === 203) {
      setUserCreateError(res.data);
    }

    setCreatingUser(true);

    if (res.status === 201) {
      setTimeout(() => {
        setUserCreated(true);
        setCreatingUser(false);
      }, 3000);

      setTimeout(() => {
        setLoggingIn(true);
        setUserCreated(false);
      }, 5000);

      setTimeout(() => {
        signIn("credentials", {
          email: values.email,
          password: values.password,
        });
      }, 8000);
    }
    setDisable(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center relative">
                  <Input
                    placeholder="Email"
                    {...field}
                  />
                  {userDuplicate && (
                    <div className="text-red-500 text-sm absolute right-3">
                      Email has already exist!
                    </div>
                  )}
                  {userCreateError.length > 0 && (
                    <div className="text-red-500 text-sm absolute right-3">
                      {userCreateError}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={disable}
          className="w-full bg-green-500 hover:bg-blue-500"
        >
          Create an account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
