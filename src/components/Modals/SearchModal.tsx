"use client";
import { useSearchModal } from "@/hooks";
import { CountryI, SearchModalStepsE } from "@/types";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { CountrySelect, Heading, Calendar, Counter } from "../";
import Modal from "./Modal";
import { useForm, FieldValues } from "react-hook-form";

interface Props {}

const SearchModal: React.FC<Props> = ({}) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const [step, setStep] = useState<SearchModalStepsE>(SearchModalStepsE.LOCATION);
  const [dateRange, setDateRange] = useState<Range>({ startDate: new Date(), endDate: new Date(), key: "selection" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm<FieldValues>({
    defaultValues: {
      locationValue: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
    },
  });

  const location = watch("locationValue");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");

  const setCustomValue = (id: string, value: string | number | null | CountryI) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const actionLabel = useMemo(() => {
    if (step === SearchModalStepsE.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === SearchModalStepsE.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== SearchModalStepsE.INFO) {
      return onNext();
    }

    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...query,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate!);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate!);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(SearchModalStepsE.LOCATION);
    searchModal.onClose();
    setDateRange({ startDate: new Date(), endDate: new Date(), key: "selection" });
    router.push(url);
    resetForm();
  }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

  const bodyContent = (() => {
    switch (step) {
      case SearchModalStepsE.LOCATION:
        return (
          <div className="flex flex-col gap-4 h-full">
            <Heading title="Where is your place located?" subtitle="Help guests find you!" />

            <CountrySelect onChange={(value) => setCustomValue("locationValue", value)} value={location} />

            <Map center={location?.latlng} />
          </div>
        );

      case SearchModalStepsE.DATE:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />

            <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
          </div>
        );

      case SearchModalStepsE.INFO:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="More information" subtitle="Find your perfect place!" />

            <Counter
              title="Guests"
              subtitle="How many guests are coming?"
              value={guestCount}
              onChange={(value) => setCustomValue("guestCount", value)}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you need?"
              value={roomCount}
              onChange={(value) => setCustomValue("roomCount", value)}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathroom do you need?"
              value={bathroomCount}
              onChange={(value) => setCustomValue("bathroomCount", value)}
            />
          </div>
        );

      default:
        return <div></div>;
    }
  })();

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === SearchModalStepsE.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;
