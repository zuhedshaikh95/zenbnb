"use client";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<Props> = ({ subtitle, title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <div className="text-xl font-bold">{title}</div>
      {!!subtitle && <div className="font-light text-neutral-500 mt-1">{subtitle}</div>}
    </div>
  );
};

export default Heading;
