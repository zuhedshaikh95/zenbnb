"use client";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<Props> = ({ icon: Icon, label, onClick, disabled, outline, small }) => {
  return (
    <button
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-70
        transition
        w-full
        border-[1px]

        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "border-black" : "border-rose-500"}
        ${outline ? "text-black" : "text-white"}

        ${small ? "py-1" : "py-2"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;
