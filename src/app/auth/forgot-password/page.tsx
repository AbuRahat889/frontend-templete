"use client";

import image from "@/assets/loginImage.png";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { toast } from "sonner";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isFocused, setIsFocused] = useState({
    email: false,
  });

  const emailValue = watch("email");

  // const [forgotPasswordFN, { isLoading }] = useForgotPasswordMutation();

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
          <div
            onClick={() => router.back()}
            className="flex items-center gap-1 cursor-pointer"
          >
            <HiArrowNarrowLeft />
            <p>back</p>
          </div>
          <div className="text-start  flex flex-col items-center justify-between ">
            <div>
              <h2 className="text-2xl md:text-4xl text-textColor font-semibold leading-[110%] w-full text-center mb-4">
                Forgot <br /> Password?
              </h2>
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

              <button
                type="submit"
                className="w-full mt-6 font-bold text-base py-3 rounded-lg bg-primaryColor text-white"
              >
                {/* {isLoading ? <Loader /> : "Send Mail"} */}
                Send Mail
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
