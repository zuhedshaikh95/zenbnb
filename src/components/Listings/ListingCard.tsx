"use client";
import { useCountries } from "@/hooks";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Button, LikeButton } from "..";

interface Props {
  data?: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user?: User | null;
}

const ListingCard: React.FC<Props> = ({ actionId = "", actionLabel, data, onAction, reservation, user, disabled }) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(data?.locationValue!);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction!(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [reservation, data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data?.id}`)}>
      <div className="flex flex-col w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data?.imageSrc!}
            alt="listing"
            fill
          />
          <div className="absolute top-3 right-3">
            <LikeButton listingId={data?.id!} user={user} />
          </div>
        </div>
        <p className="font-semibold text-lg mt-1">
          {location?.region}, {location?.label}
        </p>

        <p className="font-light text-neutral-500">{reservationDate || data?.category}</p>

        <div className="flex items-center gap-1">
          <p className="font-semibold">$ {price}</p>
          {!reservation && <p className="font-light">night</p>}
        </div>

        {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />}
      </div>
    </div>
  );
};

export default ListingCard;
