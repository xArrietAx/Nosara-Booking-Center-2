"use client";

import { BookingProvider } from "./useBookingContext";

export function ContextProvider({ children }) {
  return <BookingProvider>{children}</BookingProvider>;
}
