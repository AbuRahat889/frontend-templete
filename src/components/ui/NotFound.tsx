import React from "react";
import notFoundImage from "@/assets/error.jpg";
import Image from "next/image";
import { ChevronRight, Smile } from "lucide-react";
import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <div className="">
      <div className="flex items-center gap-14 flex-col lg:flex-row relative">
        <div>
          <Image src={notFoundImage} alt="Not Found" height={800} width={800} />
        </div>
        <Smile className="absolute top-0 right-132.2 size-36 text-[#cfcfcf]" />
        <div className="max-w-lg">
          <h1 className="text-5xl text-textColor font-bold leading-[120%]">
            Oops,
          </h1>
          <h1 className="text-4xl font-extralight mb-4 text-[#111111]">
            404 - Page Not Found
          </h1>

          <p className="text-base font-normal leading-[150%]">
            Sorry for your inconvenience. But It seems like car data are not
            available which you are looking for. Kindly search for our other
            stock pre-owned cars. Thank You.
          </p>

          <div>
            <Link
              href={"/"}
              className="mt-6 px-6 py-2.5 text-[#d3a520] text-base font-semibold rounded-md hover:bg-primaryDark transition flex items-center gap-4 hover:scale-x-105 w-60  border border-[#d3a520]"
            >
              <span>Go to Homepage</span>
              <div className="h-5 w-5 rounded-full bg-[#d3a520] flex items-center justify-center">
                <ChevronRight className="text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
