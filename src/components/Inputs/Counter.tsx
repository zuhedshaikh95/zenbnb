"use client";
import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<Props> = ({ onChange, subtitle, title, value }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;

    onChange(value - 1);
  }, [onChange, value]);

  const formatValue = useCallback(
    (value: number) => {
      if (value <= 9) {
        return `0${value}`;
      }

      return value;
    },
    [value]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onReduce}
        >
          <AiOutlineMinus />
        </div>

        <p className="font-light text-xl text-neutral-600">{formatValue(value)}</p>

        <div
          className="w-8 h-8 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onAdd}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
