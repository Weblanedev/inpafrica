"use client";

import { Toaster } from "react-hot-toast";

export default function ToastHost() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        className: "!bg-white !text-text !shadow-lg !border !border-border",
      }}
    />
  );
}
