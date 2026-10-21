
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#171A18",
          color: "#ffffff",
          border: "1px solid #C2F800",
          borderRadius: "12px",
        },
        success: {
          iconTheme: {
            primary: "#C2F800",
            secondary: "#000000",
          },
        },
      }}
    />
  );
}
