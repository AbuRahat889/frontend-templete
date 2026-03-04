import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/HomeNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen ">{children}</div>
      <Footer />
    </div>
  );
}
