"use client";

import { pageRoute } from "@/lib/page-route";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState();

  const handleActiveRoute = (route: string) => {
    router.push(route);
  };

  return (
    <main className="w-full h-full bg-neutral-900 p-10 flex flex-col">
      <header
        onClick={() => router.push("/")}
        className="w-fit text-4xl font-bold text-white mb-5 cursor-pointer"
      >
        Todo App
      </header>
      <div className="w-full h-full flex flex-row gap-x-10">
        <nav className="w-[300px] rounded-lg flex flex-col justify-around items-center p-5 border border-neutral-700 bg-neutral-800">
          <div className="w-full h-1/2">
            <span>profile</span>
          </div>
          <div className="w-full h-1/2 flex flex-col gap-y-5">
            {pageRoute.map((item) => (
              <div
                onClick={() => handleActiveRoute(item.route)}
                className="flex items-center gap-x-3 text-neutral-500"
              >
                <div>{item.icon}</div>
                <label>{item.label}</label>
              </div>
            ))}
          </div>
        </nav>
        <div className="w-full rounded-lg border border-neutral-700 bg-neutral-800">
          {children}
        </div>
      </div>
    </main>
  );
}
