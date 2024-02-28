"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUploader: React.FC<Props> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    ({ info }: any) => {
      onChange(info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget onSuccess={handleUpload} uploadPreset="Zenbnb" options={{ maxFiles: 1 }}>
      {({ open }) => (
        <div
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          onClick={() => open?.()}
        >
          <TbPhotoPlus size={50} />
          <p className="font-semibold text-lg">Upload</p>

          {value && (
            <div className="absolute inset-0 w-full h-full">
              <Image src={value} fill style={{ objectFit: "cover" }} alt="Upload" />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUploader;
