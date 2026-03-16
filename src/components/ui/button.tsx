import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white ",
  secondary: "border border-gray-400 text-gray-800 hover:bg-gray-100",
  outline: "text-primary border-2 border-primary",
  danger: "bg-[#db4746] text-white border-2 border-[#ff6f61]",
};

export default function Button({
  text,
  leftIcon,
  rightIcon,
  href,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 text-sm md:text-base font-semibold leading-[130%] py-2 px-5 rounded-full transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer";

  const buttonContent = (
    <>
      {leftIcon && (
        <span
          className={cn(
            "size-7 flex items-center justify-center",
            variant === "danger" && "bg-white h-7 w-7 rounded-full",
          )}
        >
          {leftIcon}
        </span>
      )}
      <span>{text}</span>
      {rightIcon && (
        <span
          className={cn(
            "size-7 flex items-center justify-center",
            variant === "danger" && "bg-white h-7 w-7 rounded-full",
          )}
        >
          {rightIcon}
        </span>
      )}
    </>
  );

  const classes = `${baseStyle} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {buttonContent}
    </button>
  );
}
