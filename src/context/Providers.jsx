import { HistoryProvider } from "@/hooks/useHistory";
import { BookingProvider } from "./BookingContext";

export function Providers({ children }) {
  return (
    <BookingProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </BookingProvider>
  );
}
