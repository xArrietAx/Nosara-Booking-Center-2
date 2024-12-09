import { useState, createContext } from "react";

export const BookingContext = createContext();

export function BookingProvider({ children }) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [seats, setSeats] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [adults, setAdults] = useState(0);
  const [childrens, setChildrens] = useState(0);

  const reset = () => {
    setName("");
    setPickUp("");
    setDropOff("");
    setPickUpLocation("");
    setDropOffLocation("");
    setSeats("");
    setAdults(0);
    setChildrens(0);
  };

  const value = {
   name, setName, email, setEmail, seats, setSeats, pickUp, setPickUp, dropOff, setDropOff, pickUpLocation, setPickUpLocation, dropOffLocation, setDropOffLocation, adults, setAdults, childrens, setChildrens, reset
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
