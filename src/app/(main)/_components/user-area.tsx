import SignUpLoginPopup from "@/components/shared/sign-up-log-in-popup";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const UserArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex items-center justify-center border w-[150px] h-[45px] p-3 rounded-lg bg-neutral-800 cursor-pointer">
      {(session === undefined || isLoading) && <MoonLoader size={20} />}
      {session === null && <SignUpLoginPopup />}
      {session && (
        <div
          onClick={() => signOut()}
          className="text-rose-500 font-semibold hover:text-white"
        >
          Log out
        </div>
      )}
    </div>
  );
};
export default UserArea;
