"use client";

import { SessionProviderWrapper } from "@/components/shared/session-provider-wrapper";
import Navbar from "./_components/navbar";
import Link from "next/link";
import UserArea from "./_components/user-area";
import CreateButton from "./_components/create-button";
import AddNewTask from "./_components/add-new-task";
import CreateTodoModal from "@/components/shared/create-todo-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProviderWrapper>
      <CreateTodoModal />
      <main className="w-full h-full bg-neutral-900 p-10 flex flex-col">
        <div className="flex justify-between">
          <Link href="/">
            <header className="w-fit text-4xl font-bold text-white mb-5 cursor-pointer">
              Todo App
            </header>
          </Link>
          <UserArea />
        </div>
        <div className="w-full h-full flex flex-row gap-x-10 ">
          <Navbar />
          <div className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-5 py-3 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-5 relative">
              <CreateButton />
              {children}
              <AddNewTask />
            </div>
          </div>
        </div>
      </main>
    </SessionProviderWrapper>
  );
}
