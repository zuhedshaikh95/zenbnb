"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{ style: { backgroundColor: "#24292E", color: "#fff", fontSize: 14 }, duration: 3000 }}
      position="bottom-right"
    />
  );
};

export default ToasterProvider;
