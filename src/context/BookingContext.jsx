"use client";

import { createContext, useReducer } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [data, updateData] = useReducer((prev, next) => {
    const newData = { ...prev, ...next };

    // Validación de fechas
    if (newData.pickUp && newData.dropOff && newData.pickUp >= newData.dropOff) {
      newData.dropOff = ""; // Resetear fecha de devolución inválida
    }

    // Si no hay adultos, los niños deben ser 0
    if (newData.adults === 0) {
      newData.children = 0;
    }

    // Validaciones de campos obligatorios
    const requiredFields = ["name", "email", "phone", "pickUp", "dropOff"];
    newData.errors = {}; // Inicializa errores

    requiredFields.forEach((field) => {
      if (!newData[field]) {
        newData.errors[field] = "Este campo es obligatorio";
      }
    });

    return newData;
  }, {
    name: "",
    email: "",
    phone: "",
    message: "",
    pickUp: "",
    dropOff: "",
    pickUpTime: "",
    dropOffTime: "",
    pickUpLocation: "",
    dropOffLocation: "",
    seats: 0,
    adults: 0,
    children: 0,
    carType: "",
    isAccepted: false,
    errors: {}, // Estado de errores
  });

  function reset() {
    updateData({
      name: "",
      email: "",
      phone: "",
      message: "",
      pickUp: "",
      dropOff: "",
      pickUpTime: "",
      dropOffTime: "",
      pickUpLocation: "",
      dropOffLocation: "",
      seats: 0,
      adults: 0,
      children: 0,
      carType: "",
      isAccepted: false,
      errors: {},
    });
  }

  return (
    <BookingContext.Provider value={{ data, updateData, reset }}>
      {children}
    </BookingContext.Provider>
  );
};