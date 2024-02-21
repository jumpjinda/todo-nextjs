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
import Image from "next/image";
import { signIn } from "next-auth/react";
import { SetStateAction, useState } from "react";

interface Props {
  loggingIn: boolean;
  setLoggingIn: React.Dispatch<SetStateAction<boolean>>;
  disable: boolean;
  setDisable: React.Dispatch<SetStateAction<boolean>>;
}

const LogInForm = ({ loggingIn, setLoggingIn, disable, setDisable }: Props) => {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loginError, setLoginError] = useState("");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(4, { message: "Minimum character is 4" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDisable(true);

    setTimeout(async () => {
      const isValidSignIn = await signIn("credentials", {
        email: values.email,
        password: values.password,
        // stop default redirect for handle checking credentials
        redirect: false,
      });

      if (isValidSignIn && isValidSignIn?.error !== null) {
        setDisable(false);
        setInvalidLogin(true);
        setLoginError(isValidSignIn?.error);
      }
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <header className="text-lg font-semibold flex justify-center">
        Log in
      </header>
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
                  <Input
                    placeholder="Email"
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
          {invalidLogin && (
            <div className="text-red-500 flex justify-center font-semibold">
              {loginError}
            </div>
          )}
          <Button
            type="submit"
            disabled={disable}
            className="w-full bg-blue-500 hover:bg-green-500"
          >
            Log in with Credential
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => {
          setDisable(true);
          signIn("google");
        }}
        disabled={disable}
        className="w-full bg-white text-black border hover:bg-green-500"
      >
        <span className="absolute left-20">
          <Image
            src="/google-icon.png"
            alt="google-icon"
            width={20}
            height={20}
          />
        </span>
        <span>Log in with Google</span>
      </Button>
      <Button
        onClick={() => {
          setDisable(true);
          signIn("github");
        }}
        disabled={disable}
        className="w-full bg-white text-black border hover:bg-green-500"
      >
        <span className="absolute left-20">
          <Image
            src="/github-icon.png"
            alt="github-icon"
            width={20}
            height={20}
          />
        </span>
        <span>Log in with Github</span>
      </Button>
    </div>
  );
};
export default LogInForm;
