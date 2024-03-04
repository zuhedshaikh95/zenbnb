"use client";
import { useCountries } from "@/hooks";
import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import { Avatar, ListingCategory } from "..";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface Props {
  user: User;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  locationValue: string;
}

const ListingInfo: React.FC<Props> = ({
  bathroomCount,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
  category,
}) => {
  const { getCountryByValue } = useCountries();
  const coordinates = getCountryByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold flex gap-2 items-center">
          <p>Hosted by {user.name}</p>
          <Avatar size={35} src={user.image} />
        </div>

        <div className="flex items-center gap-4 font-light text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory icon={category?.icon} label={category?.label} description={category?.description} />
      )}

      <hr />

      <p className="text-lg font-light text-neutral-500">{description}</p>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
