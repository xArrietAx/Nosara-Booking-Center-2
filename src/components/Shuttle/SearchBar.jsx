"use client"

import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import { Content } from "../SearchBar/Content";
import { Shuttle } from "../SearchBar/Shuttle";
import useCreateQueryString from "@/hooks/useCreateQueryString";

export function SearchBar() {

    const { data, updateData, reset } = useContext(BookingContext)

    const { createQueryString } = useCreateQueryString()

    function handleSubmit(e) {
      e.preventDefault()
      const { pickUpLocation, dropOffLocation } = data
      createQueryString({ pickUpLocation, dropOffLocation, page: ""})
      reset()
    }

    return <Content handleSubmit={handleSubmit}>
    <Shuttle data={data} updateData={updateData} />
  </Content>
}