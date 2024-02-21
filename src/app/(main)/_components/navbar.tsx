"use client";

import { pageRoute } from "@/lib/page-route";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { SetStateAction, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenuFoldFill } from "react-icons/ri";

interface Props {
  openNav: boolean;
  setOpenNav: React.Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ openNav, setOpenNav }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "md:translate-x-0 -translate-x-[100%] w-[200px] md:w-[300px] h-full rounded-lg flex-col justify-around items-center p-5 border border-neutral-700 bg-neutral-800 absolute md:relative z-10 transition-all duration-300",
        openNav && "translate-x-0"
      )}
    >
      <div
        onClick={() => setOpenNav(false)}
        className={cn(
          "hidden absolute top-[50%] -right-8 text-2xl text-white",
          openNav && "block"
        )}
      >
        <RiMenuFoldFill />
      </div>
      <div className="w-full h-1/2">
        <div className="flex items-center justify-center">
          {session?.user?.image ? (
            <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt="profile picture"
                fill
              />
            </div>
          ) : (
            <FaRegCircleUser size={60} />
          )}
        </div>
        <div className="mt-3 flex justify-center text-white font-semibold">
          {session?.user?.name}
        </div>
      </div>
      <div className="w-full h-1/2 flex flex-col gap-y-2">
        {pageRoute.map((item) => (
          <div
            key={item.route}
            onClick={() => router.push(item.route)}
            className={cn(
              "flex items-center gap-x-3 text-neutral-500 cursor-pointer hover:text-white hover:bg-neutral-700 p-2",
              pathname === item.route &&
                "border-r-[3px] border-green-500 bg-neutral-700 text-white"
            )}
          >
            <div>{item.icon}</div>
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
