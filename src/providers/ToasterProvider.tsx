"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{ style: { backgroundColor: "#24292E", color: "#fff", fontSize: 14 } }}
      position="bottom-right"
    />
  );
};

export default ToasterProvider;
