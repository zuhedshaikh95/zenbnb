"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo: React.FC = () => {
  const router = useRouter();

  return (
    <Image
      className="hidden md:block cursor-pointer"
      src="/media/logo.png"
      height="100"
      width="100"
      alt="logo"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
