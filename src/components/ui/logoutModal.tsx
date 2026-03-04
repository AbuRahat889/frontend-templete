import { useAppDispatch } from "@/redux/hooks";
import { MediaButton } from "./icon";
import { logout } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LogoutModal({ setIsModalOpen }: any) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div>
      <div className="flex items-center justify-center ">
        <MediaButton type="logout" />
      </div>

      <h2 className="text-2xl font-semibold text-center pt-8 ">
        Are You Sure?
      </h2>
      <p className="text-center text-base text-textColor leading-[130%] mt-3">
        Do you want to Log-out?
      </p>

      <div className="mx-auto w-full flex gap-4  justify-center pt-8">
        <button
          onClick={() => handleLogOut()}
          className="w-48 border-2 border-primaryColor text-primaryColor py-2 px-3 rounded-md text-center font-semibold"
        >
          Log out
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-48 bg-primaryColor text-white py-2 px-3 rounded-md text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
