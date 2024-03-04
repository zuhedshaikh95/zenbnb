"use client";
import React from "react";
import { Range, RangeKeyDict, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  value: Range;
  onChange: (valie: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<Props> = ({ onChange, value, disabledDates }) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
