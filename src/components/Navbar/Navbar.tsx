"use client";
import { User } from "@prisma/client";
import React from "react";
import { Categories, Container, Logo, Search, UserMenu } from "..";

interface Props {
  user?: User | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
