"use client"

import { Button } from "@/components/ui/Button";

export function Content({ children, handleSubmit }) {
    return <form  onSubmit={handleSubmit} className="grid items-center w-full py-5 border border-border rounded-2xl bg-white sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
    {children}

    <div className="px-7 pt-4 mb-4 font-bold sm:col-span-2 lg:col-span-4 lg:mb-0 xl:col-span-1 xl:pt-0">
      <Button size="lg" className="w-full h-full">
      <i className="icon-[mingcute--pencil-fill]" /> Booking 
      </Button>
    </div>
  </form>
}