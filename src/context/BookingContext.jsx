"use client"

import { createContext, useReducer } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [data, updateData] = useReducer((prev, next) => {
        const newData = { ...prev, ...next };
    
        if (newData.pickUp >= newData.dropOff) {
            newData.dropOff = '';
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
        seats: 0,
        adults: 0,
        children: 0,
        carType:'',
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
        seats: 0,
        adults: 0,
        children: 0,
        carType:'',
        isAccepted: false
      })
    }

  return (
    <BookingContext.Provider value={{ data, updateData, reset }}>
      {children}
    </BookingContext.Provider>
  );
};
