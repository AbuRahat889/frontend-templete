import React from "react";
import bgImage from "@/assets/footerBg.png";
import { MediaButton } from "./icon";

interface CommonHeaderProps {
  title?: string;
  description?: string;
  bredcome?: string;
}
export default function CommonHeader({
  title,
  description,
  bredcome,
}: CommonHeaderProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        // backgroundSize: "",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
      className="backdrop-blur-[100px]  bg-transparent"
    >
      <div className="text-center py-10">
        <h1 className="text-xl md:text-[40px] font-medium leading-tight">
          {title}
        </h1>
        <p className="text-[12px] md:text-base text-[#919191] max-w-xl mx-auto py-3">
          {description}
        </p>
        {bredcome && (
          <div className="flex items-center gap-2 w-full justify-center">
            <p className="text-[12px] md:text-base text-[#919191] max-w-xl">
              Home
            </p>
            <MediaButton type="rightArrow" />
            <p className="text-[12px] md:text-base text-[#d3a520] max-w-xl">
              {bredcome}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
