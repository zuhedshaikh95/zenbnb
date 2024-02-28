"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface Props {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  className?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<Props> = ({ errors, id, label, register, disabled, formatPrice, required, type = "text" }) => {
  return (
    <div className="w-full relative">
      {formatPrice && <BiDollar className="text-neutral-500 absolute top-5 left-2" size={24} />}
      <input
        className={`peer w-full p-2 pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${!!formatPrice ? "pl-9" : "pl-3"}
        ${!!errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${!!errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        id={id}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
      />
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-4 z-10 origin-[0] 
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:-translate-y-3
        ${!!formatPrice ? "left-9" : "left-3"}
        ${!!errors[id] ? "text-rose-500" : "text-zinc-400"}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
