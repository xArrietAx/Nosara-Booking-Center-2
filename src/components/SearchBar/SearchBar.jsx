"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { BookingContext } from "@/context/useBookingContext";
import { HiPencil, MdPerson } from "@/icons/index";
import { GolfCart } from "./Content/GolfCart";
import { Shuttle } from "./Content/Shuttle";
import { ATV } from "./Content/Atv";
import { Car } from "./Content/Car";
import { useContext } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";

export function SearchBar() {
  const {
    name,
    setName,
    email,
    setEmail,
    seats,
    setSeats,
    pickUp,
    setPickUp,
    dropOff,
    setDropOff,
    pickUpLocation,
    setPickUpLocation,
    dropOffLocation,
    setDropOffLocation,
    adults,
    setAdults,
    childrens,
    setChildrens,
    reset,
  } = useContext(BookingContext);

  const data = [
    {
      value: "Shuttle",
      label: "Shuttle",
      content: (
        <Shuttle
          pickUp={pickUp}
          setPickUp={setPickUp}
          pickUpLocation={pickUpLocation}
          setPickUpLocation={setPickUpLocation}
          dropOffLocation={dropOffLocation}
          setDropOffLocation={setDropOffLocation}
          adults={adults}
          setAdults={setAdults}
          childrens={childrens}
          setChildrens={setChildrens}
        />
      ),
    },
    {
      value: "ATV",
      label: "ATV",
      content: (
        <ATV
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          pickUp={pickUp}
          setPickUp={setPickUp}
          dropOff={dropOff}
          setDropOff={setDropOff}
        />
      ),
    },
    {
      value: "Golf cart",
      label: "Golf cart",
      content: (
        <GolfCart
          name={name}
          setName={setName}
          pickUp={pickUp}
          setPickUp={setPickUp}
          dropOff={dropOff}
          setDropOff={setDropOff}
          seats={seats}
          setSeats={setSeats}
        />
      ),
    },
    {
      value: "Car",
      label: "Car",
      content: (
        <Car
          pickUp={pickUp}
          setPickUp={setPickUp}
          dropOff={dropOff}
          setDropOff={setDropOff}
          setPickUpLocation={setPickUpLocation}
          dropOffLocation={dropOffLocation}
          setDropOffLocation={setDropOffLocation}
        />
      ),
    },
  ];

  function submit(e) {
    e.preventDefault()
    console.log({
      name,
      email,
      seats,
      pickUp,
      dropOff,
      pickUpLocation,
      dropOffLocation,
      adults,
      childrens,
    })
    reset()
  }

  return (
    <Tabs
      defaultValue="Shuttle"
      className="flex flex-col gap-7 p-7 border border-border rounded-2xl bg-white shadow-2xl "
      onChange={reset}
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <TabsList className="grid grid-cols-2 gap-2 whitespace-nowrap xs:grid-cols-4">
          {data.map((item) => {
            return (
              <TabsTrigger as="li" value={item.value} key={item.value}>
                {(isActive) => {
                  return (
                    <Button
                    size="sm"
                      variant={isActive ? "primary" : "ghost"}
                      className="w-full font-normal"
                      onClick={() => reset()}
                    >
                      {item.label}
                    </Button>
                  );
                }}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <Link
          href="/Contact"
          className="link-reverse flex items-center gap-1 w-fit font-medium text-sm"
        >
          <MdPerson className="size-[1.1rem]" /> Need some help?
        </Link>
      </div>

      <form onSubmit={submit} className="grid items-center py-5 border border-border rounded-2xl sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item) => {
          return (
            <TabsContent key={item.value} value={item.value}>
              {item.content}
            </TabsContent>
          );
        })}

        <div className="px-7 pt-4 mb-4 font-bold sm:col-span-2 lg:col-span-4 lg:mb-0 xl:col-span-1 xl:pt-0">
          <Button size="lg" className="w-full h-full">
          <HiPencil className="size-5" /> Booking
          </Button>
        </div>
      </form>
    </Tabs>
  );
}
