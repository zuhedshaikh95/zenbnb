"use client";

import { EmptyState } from "@/components";
import React, { useEffect } from "react";

interface Props {
  error: Error;
}

const ErrorState: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.log("Error: ", error.message);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
