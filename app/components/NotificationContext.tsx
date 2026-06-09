"use client";

import { createContext, useContext, useRef, useState } from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => undefined,
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");
  const timeoutRef = useRef<number | null>(null);

  const showNotification = (
    nextMessage: string,
    nextType: NotificationType = "success",
  ) => {
    setMessage(nextMessage);
    setType(nextType);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
