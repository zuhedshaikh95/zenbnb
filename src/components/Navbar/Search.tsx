"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";

interface Props {}

const Search: React.FC<Props> = ({}) => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm px-6 font-semibold">Anywhere</div>
        <div className="hidden sm:block text-sm px-6 font-semibold border-x-[1px] flex-1 text-center">Anyweek</div>
        <div className="text-sm px-6 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
