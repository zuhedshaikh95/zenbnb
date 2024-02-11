"use client";
import Image from "next/image";
import React from "react";

interface Props {
  size: number;
  src?: string | null;
}

const Avatar: React.FC<Props> = ({ size, src }) => {
  return (
    <Image src={src ?? "/media/placeholder.jpg"} className="rounded-full" height={size} width={size} alt="avatar" />
  );
};

export default Avatar;
