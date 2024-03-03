"use client";
import { categories } from "@/configs/categories.config";
import { useRentModal } from "@/hooks";
import { CountryI, RentModalStepsE } from "@/types";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CategoryInput, Counter, CountrySelect, Heading, ImageUploader, Input } from "..";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {}

const RentModal: React.FC<Props> = ({}) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      Category: null,
      Location: null,
      Guest_Count: 1,
      Bathroom_Count: 1,
      Room_Count: 1,
      Image: null,
      Price: 1,
      Title: null,
      Description: null,
    },
  });

  const category = watch("Category");
  const location = watch("Location");
  const guestCount = watch("Guest_Count");
  const bathroomCount = watch("Bathroom_Count");
  const roomCount = watch("Room_Count");
  const imageSrc = watch("Image");

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (step !== RentModalStepsE.PRICE) {
      return onNext();
    }
    values.Location = values.Location?.value;
    setIsLoading(true);

    try {
      const response = await axios.post("/api/listings", values);
      toast.success(response.data.message);
      router.refresh();
      resetForm();
      setStep(RentModalStepsE.CATEGORY);
      rentModal.onClose();
    } catch (error: any) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
                    onClick={(category) => setCustomValue("Category", category)}
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

            <CountrySelect onChange={(value) => setCustomValue("Location", value)} value={location} />

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
              onChange={(value) => setCustomValue("Guest_Count", value)}
              value={guestCount}
            />
            <hr />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you have?"
              onChange={(value) => setCustomValue("Room_Count", value)}
              value={roomCount}
            />
            <hr />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms do you have?"
              onChange={(value) => setCustomValue("Bathroom_Count", value)}
              value={bathroomCount}
            />
          </div>
        );

      case RentModalStepsE.IMAGES:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Add a photo of your place" subtitle="Show guests wht your place looks like!" />

            <ImageUploader onChange={(url) => setCustomValue("Image", url)} value={imageSrc} />
          </div>
        );

      case RentModalStepsE.DESCRIPTION:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="How would you describe your place?" subtitle="Keep it short and crisp!" />

            <Input id="Title" label="Title" disabled={isLoading} register={register} errors={errors} required />
            <hr />
            <Input
              id="Description"
              label="Description"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        );

      case RentModalStepsE.PRICE:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Now, set your price" subtitle="How much do you charge per night?" />

            <div>
              <Input
                type="number"
                id="Price"
                label="Price"
                errors={errors}
                register={register}
                disabled={isLoading}
                formatPrice
                required
              />
            </div>
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RentModalStepsE.CATEGORY ? undefined : onBack}
      disabled={isLoading}
      title="Zenbnb your home!"
    />
  );
};

export default RentModal;
