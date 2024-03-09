"use client";
import { useCountries } from "@/hooks";
import { User } from "@/types";
import React from "react";
import { Heading, LikeButton } from "..";
import Image from "next/image";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  user?: User;
}

const ListingHead: React.FC<Props> = ({ id, locationValue, title, imageSrc, user }) => {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image className="object-cover w-full" src={imageSrc} fill alt="listing" />

        <div className="absolute top-5 right-5">
          <LikeButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
