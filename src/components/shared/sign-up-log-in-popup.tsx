"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpForm from "./sign-up-form";
import LogInForm from "./log-in-form";
import { useState } from "react";

const SignUpLoginPopup = () => {
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [disable, setDisable] = useState(false);

  return (
    <Dialog>
      <DialogTrigger className="text-rose-500 font-semibold hover:text-white">
        Sign up / Log in
      </DialogTrigger>
      {/* {creatingUser && (
        <DialogContent>
          <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
            Creating User...
          </div>
        </DialogContent>
      )}
      {userCreated && (
        <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
          User created!
        </div>
      )}
      {loggingIn && (
        <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
          Logging in...
        </div>
      )} */}
      <DialogContent>
        {creatingUser && (
          <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
            Creating User...
          </div>
        )}
        {userCreated && (
          <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
            User Created!
          </div>
        )}
        {loggingIn && (
          <div className="w-full h-full flex justify-center items-center text-3xl font-bold">
            Logging In...
          </div>
        )}
        {!creatingUser && !userCreated && !loggingIn && (
          <>
            <DialogHeader>
              <DialogTitle className="flex justify-center">
                Create an account
              </DialogTitle>
              <DialogDescription>
                You have to create an account or log in before use Todo
                application
              </DialogDescription>
            </DialogHeader>
            <SignUpForm
              creatingUser={creatingUser}
              setCreatingUser={setCreatingUser}
              userCreated={userCreated}
              setUserCreated={setUserCreated}
              loggingIn={loggingIn}
              setLoggingIn={setLoggingIn}
              disable={disable}
              setDisable={setDisable}
            />
            <div className="flex items-center gap-x-3">
              <div className="border w-full h-[1px]" />
              <span>or</span>
              <div className="border w-full h-[1px]" />
            </div>
            <LogInForm
              loggingIn={loggingIn}
              setLoggingIn={setLoggingIn}
              disable={disable}
              setDisable={setDisable}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default SignUpLoginPopup;
