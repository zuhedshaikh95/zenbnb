"use client";
import { categories } from "@/configs/categories.config";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { CategoryBox, Container } from "..";

interface Props {}

const Categories: React.FC<Props> = ({}) => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {categories.map((item) => (
          <CategoryBox key={item.label} selected={category === item.label} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
