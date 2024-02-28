"use client";
import { categories } from "@/configs/categories.config";
import { useRentModal } from "@/hooks";
import { CountryI, RentModalStepsE } from "@/types";
import React, { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CategoryInput, Counter, CountrySelect, Heading, ImageUploader } from "..";
import Modal from "./Modal";
import dynamic from "next/dynamic";

interface Props {}

const RentModal: React.FC<Props> = ({}) => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<RentModalStepsE>(RentModalStepsE.CATEGORY);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      bathroomCount: 1,
      roomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(() => dynamic(() => import("../Map")), [location]);

  const setCustomValue = (id: string, value: string | number | null | CountryI) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const actionLabel = useMemo<string>(() => {
    if (step === RentModalStepsE.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo<string>(() => {
    if (step === RentModalStepsE.CATEGORY) {
      return "";
    }

    return "Back";
  }, [step]);

  const bodyContent = (() => {
    switch (step) {
      case RentModalStepsE.CATEGORY:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Which of these best describes your place?" subtitle="Pick a category" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
              {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={(category) => setCustomValue("category", category)}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case RentModalStepsE.LOCATION:
        return (
          <div className="flex flex-col gap-4 h-full">
            <Heading title="Where is your place located?" subtitle="Help guests find you!" />

            <CountrySelect onChange={(value) => setCustomValue("location", value)} value={location} />

            <Map center={location?.latlng} />
          </div>
        );

      case RentModalStepsE.INFO:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />

            <Counter
              title="Guests"
              subtitle="How many guests do you allow?"
              onChange={(value) => setCustomValue("guestCount", value)}
              value={guestCount}
            />
            <hr />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              onChange={(value) => setCustomValue("roomCount", value)}
              value={roomCount}
            />
            <hr />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              onChange={(value) => setCustomValue("bathroomCount", value)}
              value={bathroomCount}
            />
          </div>
        );

      case RentModalStepsE.IMAGES:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Add a photo of your place" subtitle="Show guests wht your place looks like!" />

            <ImageUploader onChange={(url) => setCustomValue("imageSrc", url)} value={imageSrc} />
          </div>
        );
      default:
        <div></div>;
    }
  })();

  return (
    <Modal
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RentModalStepsE.CATEGORY ? undefined : onBack}
      title="Zenbnb your home!"
    />
  );
};

export default RentModal;
