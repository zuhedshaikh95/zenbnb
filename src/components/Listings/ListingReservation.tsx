"use client";
import React from "react";
import { Range } from "react-date-range";
import { Button, Calendar } from "..";

interface Props {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservation: React.FC<Props> = ({
  price,
  dateRange,
  onChangeDate,
  onSubmit,
  totalPrice,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <p className="text-2xl font-semibold">$ {price}</p>
        <p className="font-light text-neutral-600">night</p>
      </div>

      <hr />

      <div className="min-h-[410px]">
        <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
      </div>

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
