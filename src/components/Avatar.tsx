"use client";
import Image from "next/image";
import React from "react";

interface Props {
  size: number;
}

const Avatar: React.FC<Props> = ({ size }) => {
  return <Image src="/media/placeholder.jpg" className="rounded-full" height={size} width={size} alt="avatar" />;
};

export default Avatar;
