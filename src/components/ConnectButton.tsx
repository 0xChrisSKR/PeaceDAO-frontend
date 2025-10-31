"use client";

import React from "react";
import { AppKitButton } from "@reown/appkit/react";

export default function ConnectButton() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <AppKitButton label="Connect Wallet" />
    </div>
  );
}
