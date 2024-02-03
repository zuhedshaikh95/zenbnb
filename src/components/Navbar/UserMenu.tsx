"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Avatar, MenuItem } from "..";
import { useRegisterModal } from "@/hooks";

interface Props {}

const UserMenu: React.FC<Props> = ({}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const registerModal = useRegisterModal();

  const handleToggleShowMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="hidden md:flex md:items-center">
          <div
            className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
            onClick={() => {}}
          >
            Zenbnb your home
          </div>

          <div className="hover:bg-neutral-200 cursor-pointer rounded-full py-3 px-4 text-[#222]">
            <HiOutlineGlobeAlt size={18} />
          </div>
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={() => handleToggleShowMenu()}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar size={30} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-11/12 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            <MenuItem label="Log in" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
