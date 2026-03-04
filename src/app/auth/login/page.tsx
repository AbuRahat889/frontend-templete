"use client";

import image from "@/assets/loginImage.png";
import Loader from "@/components/ui/Loader";
import { handleApiResponse } from "@/lib/handleApiResponse";
import { useLoginAdminMutation } from "@/redux/api/auth";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const emailValue = useWatch({ control, name: "email" });
  const passwordValue = useWatch({ control, name: "password" });

  const [loginFN, { isLoading }] = useLoginAdminMutation();

  const onSubmit = async (data: any) => {
    console.log(data);
    const res = await handleApiResponse(loginFN, data, "Login successful!");
    console.log(res);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white ">
      {/* Left Section */}
      <div className="hidden md:block w-full ">
        <Image
          src={image}
          alt="Fishing Trip"
          className="h-full w-full lg:h-screen object-fill"
          height={600}
          width={600}
        />
      </div>

      {/* Right Section */}
      <div className="w-full h-screen flex items-center justify-center px-5 lg:px-0 bg-white">
        <div className="w-xl mx-auto shadow-custom-shadow rounded-3xl px-5 lg:px-9 py-12">
          <div className="text-start  flex flex-col items-center justify-between ">
            <div>
              <h2 className="text-2xl md:text-4xl text-black font-semibold leading-[110%] w-full text-center mb-4">
                Welcome back
              </h2>

              <p className="text-sm md:text-lg text-secondaryColor font-normal leading-[150%] text-center mb-6">
                Welcome back! Continue where you left off and keep building your
                skills.
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
              <div className="relative w-full">
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
                  <div>
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
                      className="absolute right-3  -translate-y-6 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message as string}
                  </p>
                )}
                <Link
                  href="/auth/forgot-password"
                  className="text-sm md:text-base flex items-center justify-end  text-red-500 hover:underline font-medium mt-1"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white bg-green-600"
              >
                {isLoading ? <Loader /> : "Login"}
              </button>
            </form>

            <p className="text-black text-base font-normal leading-6 mt-6">
              Don’t have an account?{" "}
              <Link
                href={"/auth/sign-up"}
                className="text-primaryColor hover:underline transition-colors duration-300 ease-in-out"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
