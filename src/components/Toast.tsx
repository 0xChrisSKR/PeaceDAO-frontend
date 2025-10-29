"use client";

import { Toaster } from "react-hot-toast";

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(255,255,255,0.92)",
          color: "#1f2937",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          borderRadius: "16px",
          fontWeight: 500
        }
      }}
    />
  );
}
