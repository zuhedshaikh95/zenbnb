"use client";
import { useRentModal } from "@/hooks";
import React from "react";
import Modal from "./Modal";

interface Props {}

const RentModal: React.FC<Props> = ({}) => {
  const rentModal = useRentModal();

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
      title="Zenbnb your home!"
    />
  );
};

export default RentModal;
