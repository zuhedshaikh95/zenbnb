"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "..";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<Props> = ({
  actionLabel,
  onClose,
  onSubmit,
  secondaryAction,
  body,
  disabled,
  footer,
  isOpen,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
            flex 
            justify-center 
            items-center 
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            z-50
            outline-none
            focus:outline-none
            bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            h-full
            md:h-auto
        "
        >
          {/* CONTENT */}
          <div
            className={`
                duration-300
                h-full
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                h-full
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* HEADER */}
              <div
                className="
                  flex
                  items-center
                  p-3
                  rounded-t
                  justify-center
                  relative
                  border-b-[1px]
                "
              >
                <button
                  className="
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-3
                  "
                  onClick={() => handleClose()}
                >
                  <IoMdClose size={18} />
                </button>
                <p className="text-lg font-semibold">{title}</p>
              </div>

              {/* BODY */}
              <div className="relative p-4 flex-auto">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={(event) => handleSecondaryAction()}
                    />
                  )}

                  <Button disabled={disabled} label={actionLabel} onClick={(event) => handleSubmit()} />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
