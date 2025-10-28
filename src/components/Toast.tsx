"use client";

import { Toaster } from "react-hot-toast";

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "#f8fafc",
          border: "1px solid #1e293b"
        }
      }}
    />
  );
}
