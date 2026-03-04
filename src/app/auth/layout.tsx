import React from "react";
import { Toaster } from "sonner";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
