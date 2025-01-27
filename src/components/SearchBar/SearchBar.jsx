"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { BookingContext } from "@/context/BookingContext";
import { HiPencil, MdPerson } from "@/icons/index";
import { Button } from "@/components/ui/Button";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GolfCart } from "./GolfCart";
import { Shuttle } from "./Shuttle";
import Link from "next/link";
import { ATV } from "./Atv";
import { Car } from "./Car";

export function SearchBar() {

  const { data, updateData, reset } = useContext(BookingContext)
  const { push } = useRouter()

  useEffect(() => {
    reset()
  }, [])
  
  const tabList = [
    {
      value: "Shuttle",
      label: "Shuttle",
      content: <Shuttle data={data} updateData={updateData} />,
    },
    {
      value: "ATV",
      label: "ATV",
      content: <ATV data={data} updateData={updateData} />,
    },
    {
      value: "Golf cart",
      label: "Golf cart",
      content: <GolfCart data={data} updateData={updateData} />,
    },
    {
      value: "Car",
      label: "Car",
      content: <Car data={data} updateData={updateData} />,
    },
  ];

  function handleSubmit(e, tab) {
  e.preventDefault()
  if(tab === "Shuttle") return 
  
  push(`/Rentals/${tab}`)

  }

  return (
    <Tabs defaultValue="Shuttle" className="flex flex-col gap-7 p-7 border border-border rounded-2xl bg-white shadow-2xl">
     {({ activeTab }) => {
    return <>
    <div className="flex flex-wrap items-center justify-between gap-5">
      <TabsList className="grid grid-cols-2 gap-2 w-full whitespace-nowrap min-[420px]:grid-cols-4 min-[420px]:w-fit">
        {tabList.map((item) => (
          <TabsTrigger
            key={item.value}
            size="sm"
            value={item.value}
            className="font-normal"
            onClick={reset}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex items-center gap-2 text-sm-medium text-text">
        <MdPerson className="size-4" />
        <Link href="/Contact">Need some help?</Link>
      </div>
    </div>

    <form onSubmit={e => handleSubmit(e, activeTab)} className="grid items-center py-5 border border-border rounded-2xl sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {tabList.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}

      <div className="px-7 pt-4 mb-4 font-bold sm:col-span-2 lg:col-span-4 lg:mb-0 xl:col-span-1 xl:pt-0">
        <Button size="lg" className="w-full h-full">
          <HiPencil className="size-5" /> Booking
        </Button>
      </div>
    </form>
  </>
  }}
</Tabs>
  );
}