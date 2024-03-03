import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<Props> = ({ description, icon: Icon, label }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon className="text-neutral-600" size={40} />

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-neutral-500 font-light">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
