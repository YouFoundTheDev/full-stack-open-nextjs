"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm ${
        type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-800"
      }`}
    >
      {message}
    </div>
  );
}
