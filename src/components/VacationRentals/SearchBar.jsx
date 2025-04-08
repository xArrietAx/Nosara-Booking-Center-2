"use client"

import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import { Content } from "../SearchBar/Content";
import { House } from "../SearchBar/House";
import useCreateQueryString from "@/hooks/useCreateQueryString";

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
    <House data={data} updateData={updateData} />
  </Content>
}