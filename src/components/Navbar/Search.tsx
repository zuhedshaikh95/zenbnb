"use client";
import { useCountries, useSearchModal } from "@/hooks";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {}

const Search: React.FC<Props> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getCountryByValue } = useCountries();

  const locationValue = params.get("locationValue");
  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const guestCount = params.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue!)?.label;
    }

    return "Anywhere";
  }, [getCountryByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = differenceInDays(end, start);

      if (diff === 0) {
        return 1;
      }

      return `${diff} Days`;
    }

    return "Anyweek";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between text-sm">
        <div className="px-6 font-semibold">{locationLabel}</div>
        <div className="hidden sm:block px-6 font-semibold border-x-[1px] flex-1 text-center">{durationLabel}</div>
        <div className="px-6 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
