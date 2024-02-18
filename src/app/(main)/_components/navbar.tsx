import { pageRoute } from "@/lib/page-route";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [activeRoute, setActiveRoute] = useState("/");

  const handleActiveRoute = (route: string) => {
    setActiveRoute(route);
    router.push(route);
  };

  return (
    <nav className="w-[300px] rounded-lg flex flex-col justify-around items-center p-5 border border-neutral-700 bg-neutral-800">
      <div className="w-full h-1/2">
        <div className="flex items-center justify-center">
          {session?.user?.image ? (
            <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden">
              <Image
                src={session?.user?.image}
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
            onClick={() => handleActiveRoute(item.route)}
            className={cn(
              "flex items-center gap-x-3 text-neutral-500 cursor-pointer hover:text-white hover:bg-neutral-700 p-2",
              activeRoute === item.route &&
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
