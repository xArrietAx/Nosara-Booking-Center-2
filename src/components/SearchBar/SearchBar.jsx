"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { BookingContext } from "@/context/BookingContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SideBySide } from "./SideBySide";
import { GolfCart } from "./GolfCart";
import { Content } from "./Content";
import { Shuttle } from "./Shuttle";
import Link from "next/link";
import { ATV } from "./Atv";

export function SearchBar() {

  const { data, updateData, reset } = useContext(BookingContext)
  const { push } = useRouter()
  const { createQueryString } = useCreateQueryString()

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
      value: "Golf-cart",
      label: "Golf cart",
      content: <GolfCart data={data} updateData={updateData} />,
    },
    {
      value: "Side-by-side",
      label: "Side by side",
      content: <SideBySide data={data} updateData={updateData} />,
    },
  ];

  function handleSubmit(e, tab) {
  e.preventDefault()

  if(tab === "Shuttle") {
    const { pickUpLocation, dropOffLocation, pickUp: date, adults, children } = data
    createQueryString({ pickUpLocation, dropOffLocation, date, adults, children }, null, "Shuttles", "shuttles")
  } else {
    push(`/Rentals/${tab}`)
  }

  reset()
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
            className="!px-3"
            onClick={reset}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex items-center gap-1 text-sm-medium">
        <i className="icon-[bi--person-fill] text-text/50 size-4" />
        <Link href="/Contact" className="link-reverse" >Need some help?</Link>
      </div>
    </div>

    <Content handleSubmit={e => handleSubmit(e, activeTab)}>
    {tabList.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Content>
  </>
  }}
</Tabs>
  );
}