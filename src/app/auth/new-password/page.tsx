"use client";

import image from "@/assets/loginImage.png";
import Loader from "@/components/ui/Loader";
import { useLoginAdminMutation } from "@/redux/api/auth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type DecodedToken = {
  email?: string;
  [key: string]: any;
};

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isFocused, setIsFocused] = useState({
    password: false,
    confirmPassword: false,
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const [resetPasswordFN, { isLoading }] = useLoginAdminMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row w-full ">
      {/* Left Section */}
      <div className="hidden md:block w-full ">
        <Image
          src={image}
          alt="Fishing Trip"
          className="h-full w-full lg:h-[100vh] object-fill"
          height={600}
          width={600}
        />
      </div>

      {/* Right Section */}
      <div className="w-full h-screen flex items-center justify-center px-5 lg:px-0 ">
        <div className="w-[576px] mx-auto shadow-custom-shadow rounded-3xl px-5 lg:px-9 py-12">
          <div className="text-start  flex flex-col items-center justify-between ">
            <div>
              <h2 className="text-2xl md:text-4xl text-textColor font-semibold leading-[110%] w-full text-center mb-4">
                Change Password
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full pt-6 space-y-6"
            >
              {/* Password */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className={`absolute left-3 px-1 transition-all bg-white text-base ${
                    isFocused.password || passwordValue
                      ? "-top-3  text-[#acb5bb] px-8"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Password
                </label>
                <div className="w-full flex items-center justify-between border-2 border-[#dce4e8] rounded-[10px] p-3 outline-none">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "password is required",
                    })}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, password: true }))
                    }
                    onBlur={() =>
                      setIsFocused((prev) => ({ ...prev, password: false }))
                    }
                    className=" text-[#747474] w-full outline-none"
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 px-1 transition-all bg-white text-base ${
                    isFocused.confirmPassword || confirmPasswordValue
                      ? "-top-3  text-[#acb5bb] px-8"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Confirm Password
                </label>
                <div className="w-full flex items-center justify-between border-2 border-[#dce4e8] rounded-[10px] p-3 outline-none">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                    onFocus={() =>
                      setIsFocused((prev) => ({
                        ...prev,
                        confirmPassword: true,
                      }))
                    }
                    onBlur={() =>
                      setIsFocused((prev) => ({
                        ...prev,
                        confirmPassword: false,
                      }))
                    }
                    className=" text-[#747474] w-full outline-none"
                  />
                  <div
                    onClick={() => setShowPassword((prev) => !prev)}
                    className=" text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white"
              >
                {isLoading ? <Loader /> : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
