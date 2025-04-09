"use client"

import { createContext, useReducer } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [data, updateData] = useReducer((prev, next) => {
        const newData = { ...prev, ...next };
    
        if (newData.pickUp >= newData.dropOff) {
            newData.dropOff = '';
        }

        if (newData.checkIn >= newData.checkOut) {
          newData.checkOut = '';
      }

        if (newData.adults === 0) {
          newData.children = 0
        }
    
        return newData;
    }, {
      name:'',
      email:'',
      phone:'',
      message:'',
      pickUp: '',
      dropOff: '',
      pickUpTime: '',
      dropOffTime: '',
      pickUpLocation: '',
      dropOffLocation: '',
      seats: '',
      adults: 0,
      children: 0,
      childrenAge: '',
      luggages: '',
      surfboard: '',
      babySeat: '',
      airline: '',
      flightNumber: '',
      carType:'',
      location: '',
      checkIn: '',
      checkOut: '',
      isAccepted: false
    });
    
    function reset() {
      updateData({
        name:'',
      email:'',
      phone:'',
      message:'',
      pickUp: '',
      dropOff: '',
      pickUpTime: '',
      dropOffTime: '',
      pickUpLocation: '',
      dropOffLocation: '',
      seats: '',
      adults: 0,
      children: 0,
      childrenAge: '',
      luggages: '',
      surfboard: '',
      babySeat: '',
      airline: '',
      flightNumber: '',
      carType:'',
      location: '',
      checkIn: '',
      checkOut: '',
      isAccepted: false,
      rent:'',
      tour:'',
      departureTime:'',
      house:'',
      route:'',
      date:''
      })
    }

  return (
    <BookingContext.Provider value={{ data, updateData, reset }}>
      {children}
    </BookingContext.Provider>
  );
};
