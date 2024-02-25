"use client";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<Props> = ({ icon: Icon, onClick, label, selected }) => {
  return (
    <div
      className={`
          rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
          ${selected ? "border-black" : "border-neutral-200"}
        `}
      onClick={() => onClick(label)}
    >
      <Icon size={25} />
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default CategoryInput;
