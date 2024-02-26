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
    <div>
      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "#000",
            primary25: "#ffe4e6",
          },
        })}
        classNames={{
          control: () => "p-1",
          input: () => "text-md",
          option: () => "text-md",
        }}
        placeholder="Anywhere"
        isClearable
        options={getAllCountries()}
        value={value}
        onChange={(value) => onChange(value as CountryI)}
        formatOptionLabel={(option: CountryI) => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <p>
              {option.label}, <span className="text-neutral-500 ml-1">{option.region}</span>
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;
