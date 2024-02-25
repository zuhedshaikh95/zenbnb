"use client";
import { useRentModal } from "@/hooks";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { RentModalStepsE } from "@/types";
import { CategoryInput, Heading } from "..";
import { categories } from "@/configs/categories.config";
import { FieldValues, useForm } from "react-hook-form";

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
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: string | number | null) => {
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

  let bodyContent = (
    <div className="flex flex-col gap-8">
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

  return (
    <Modal
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RentModalStepsE.CATEGORY ? undefined : onBack}
      title="Zenbnb your home!"
    />
  );
};

export default RentModal;
