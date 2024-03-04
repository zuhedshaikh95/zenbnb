"use client";
import { useLoginModal, useRegisterModal, useRentModal } from "@/hooks";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Avatar, MenuItem } from "..";

interface Props {
  user?: User | null;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const handleToggleShowMenu = () => setShowMenu((prev) => !prev);

  const handleMenuClickAndClose = (func: Function) => {
    func();
    setShowMenu(false);
  };

  const navigate = (path: string) => router.push(path);

  const onRent = useCallback(() => {
    if (!user) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [user, loginModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div className="hidden md:flex md:items-center">
          <div
            className="text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-200 transition cursor-pointer"
            onClick={onRent}
          >
            Zenbnb your home
          </div>

          <div className="hover:bg-neutral-200 cursor-pointer rounded-full py-3 px-4 text-[#222]">
            <HiOutlineGlobeAlt size={18} />
          </div>
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={handleToggleShowMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar size={35} src={user?.image} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-11/12 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem label="My trips" onClick={() => handleMenuClickAndClose(router.push.bind(null, "/trips"))} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Zenbnb my home" onClick={() => handleMenuClickAndClose(rentModal.onOpen)} />

                <hr />

                <MenuItem label="Logout" onClick={() => handleMenuClickAndClose(signOut)} />
              </>
            ) : (
              <>
                <MenuItem label="Sign up" onClick={() => handleMenuClickAndClose(registerModal.onOpen)} />
                <MenuItem label="Log in" onClick={() => handleMenuClickAndClose(loginModal.onOpen)} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
