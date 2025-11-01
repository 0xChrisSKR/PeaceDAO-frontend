"use client";

export default function ConnectButton() {
  const handleClick = () => {
    console.warn("Wallet connection is currently disabled.");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
    >
      Connect Wallet
    </button>
  );
}
