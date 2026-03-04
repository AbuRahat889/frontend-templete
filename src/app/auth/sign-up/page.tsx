"use client";

import image from "@/assets/loginImage.png";
import Loader from "@/components/ui/Loader";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  // const [createUserFN, { isLoading }] = useUsersCreateMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white">
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
                Create an account
              </h2>

              <p className="text-sm md:text-lg text-secondaryColor font-normal leading-[150%] text-center mb-6">
                Enter new email and password for create an <br /> account.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full pt-6 space-y-6"
            >
              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-3 px-1 transition-all bg-white text-base ${
                    isFocused.email || emailValue
                      ? "-top-3  text-[#acb5bb] px-8"
                      : "top-3 text-gray-400"
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "email is required" })}
                  onFocus={() =>
                    setIsFocused((prev) => ({ ...prev, email: true }))
                  }
                  onBlur={() =>
                    setIsFocused((prev) => ({ ...prev, email: false }))
                  }
                  className="w-full border-2 border-[#dce4e8] rounded-[10px] p-3 outline-none text-[#747474]"
                  placeholder=" "
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

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
                Sign up
                {/* {isLoading ? <Loader /> : "Sign up"} */}
              </button>
            </form>

            <p className="text-textColor text-base font-normal leading-6 mt-6">
              You have an account?{" "}
              <Link
                href={"/auth/login"}
                className="hover:text-primaryColor hover:underline transition-colors duration-300 ease-in-out"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
