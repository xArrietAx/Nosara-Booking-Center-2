"use client"

import useCreateQueryString from "@/hooks/useCreateQueryString";
import { BookingContext } from "@/context/BookingContext";
import { Content } from "../SearchBar/Content";
import { Tour } from "../SearchBar/Tour";
import { useContext } from "react";

export function SearchBar() {

    const { data, updateData, reset } = useContext(BookingContext)

    const { createQueryString } = useCreateQueryString()

    function handleSubmit(e) {
        e.preventDefault()
        const { location } = data
        createQueryString({ location, page: ""})
        reset()
    }

    return <Content handleSubmit={handleSubmit}>
    <Tour data={data} updateData={updateData} />
  </Content>
}