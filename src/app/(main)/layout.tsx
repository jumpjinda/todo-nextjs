"use client";

import Navbar from "./_components/navbar";
import Link from "next/link";
import UserArea from "./_components/user-area";
import CreateButton from "./_components/create-button";
import CreateTodoModal from "@/components/shared/create-todo-modal";
import TodoProvider from "@/components/shared/todo-context";
import { useSession } from "next-auth/react";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  return (
    <TodoProvider>
      <CreateTodoModal />
      <main className="w-full h-full bg-neutral-900 p-3 md:p-10 flex flex-col transition-all duration-300">
        <div className="flex justify-between items-center mb-5">
          <Link
            href="/"
            className="w-fit h-full flex items-center text-2xl md:text-4xl font-bold text-white"
          >
            Todo App
          </Link>
          <UserArea />
        </div>
        <div className="w-full h-full flex flex-row gap-x-10 overflow-hidden transition-all duration-300 relative">
          <div
            onClick={() => setOpenNav(true)}
            className="absolute top-[50%] left-0 text-white text-2xl hover:scale-110 md:hidden z-10"
          >
            <RiMenuUnfoldLine />
          </div>
          <Navbar
            openNav={openNav}
            setOpenNav={setOpenNav}
          />
          <div
            className={cn(
              "w-full rounded-lg border border-neutral-700 bg-neutral-800 px-5 py-3 overflow-auto no-scrollbar flex justify-center",
              session && "block"
            )}
          >
            {session && (
              <div
                className={cn(
                  "grid gap-y-5 gap-x-5 relative",
                  pathname === "/"
                    ? "grid-cols-1"
                    : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                )}
              >
                <CreateButton />
                {children}
              </div>
            )}
            {!session && (
              <div className="py-5 max-w-[500px] flex flex-col">
                <header className="text-center text-2xl font-bold text-neutral-300">
                  This is Todo App Project
                </header>
                <div className="mt-3 text-neutral-300">
                  <p className="indent-8">
                    This project made by{" "}
                    <span className="font-bold text-xl italic text-rose-500">
                      Tanawat Jinda
                    </span>{" "}
                    to show how basic NextJs can do. It's the Full Stack
                    application with basic front-end and back-end and connecting
                    to mongoDB.
                  </p>
                </div>
                <div className="mt-10 text-center text-2xl font-semibold text-rose-500">
                  Please Log in before using App
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </TodoProvider>
  );
}
