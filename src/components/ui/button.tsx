"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "gradientBorder";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  href?: string;
  icon?: boolean;
  animateOnView?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bgColor text-sm lg:text-base rounded-full text-white leading-normal md:text-base font-semibold w-full",
        outline:
          "text-base rounded-full text-white leading-normal md:text-base font-semibold w-full",
        gradientBorder:
          "relative rounded-full p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 inline-block",
      },
      size: {
        default: "h-12",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      icon,
      animateOnView = false,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : "button";

    const motionProps = animateOnView
      ? {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, ease: "easeOut" as const },
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.97 },
        }
      : {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.97 },
        };

    if (variant === "gradientBorder") {
      return (
        <div
          className="rounded-full p-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500"
          {...motionProps}
        >
          <Comp
            className={cn(
              "px-6 py-2.5 font-semibold text-textColor bg-white rounded-full w-full flex items-center justify-center",
              className
            )}
            ref={ref}
            {...(props as any)}
          >
            {props.children}
          </Comp>
        </div>
      );
    }

    if (href) {
      return (
        <div {...motionProps}>
          <Link
            href={href}
            className={cn(
              buttonVariants({ variant, size, className }),
              "flex items-center justify-between px-1 pl-8 text-center"
            )}
          >
            {props.children}
            {icon && (
              <div className="bg-white p-2 rounded-full">
                <GoArrowUpRight className=" text-red-600 size-9" />
              </div>
            )}
          </Link>
        </div>
      );
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "flex items-center justify-between px-1 pl-4 lg:pl-8 text-center"
        )}
        ref={ref}
        {...(motionProps as any)}
        {...(props as any)}
      >
        {props.children}
        {icon && (
          // <MediaButton type="buttonIcon" />
          <div className="bg-white p-2 rounded-full">
            <GoArrowUpRight className=" text-red-600 size-9" />
          </div>
          // <div className="bg-white h-10 w-10 rounded-full flex items-center justify-center ">

          // </div>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
