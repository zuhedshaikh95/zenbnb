"use client";
import { useCountries } from "@/hooks";
import { CountryI } from "@/types";
import React from "react";
import Select from "react-select";

interface Props {
  value?: CountryI;
  onChange: (value: CountryI) => void;
}

const CountrySelect: React.FC<Props> = ({ onChange, value }) => {
  const { getAllCountries } = useCountries();

  return (
    <div className="">
      <Select placeholder="Anywhere" isClearable />
    </div>
  );
};

export default CountrySelect;
