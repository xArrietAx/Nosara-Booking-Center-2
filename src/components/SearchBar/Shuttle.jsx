"use client"

import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "./components/Select";
import { Input } from "./components/Input";

export function Shuttle({ data, updateData }) {

  const { pickUp, pickUpLocation, dropOffLocation, adults, children } = data 

  return (
    <>
     <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up location</span>
          <Input value={pickUpLocation} setValue={value => updateData({ pickUpLocation: value })} iconName="icon-[bi--geo-alt-fill]" placeholder="City or airport" />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off location</span>
          <Input value={dropOffLocation} setValue={value => updateData({ dropOffLocation: value })} iconName="icon-[bi--geo-alt-fill]" placeholder="City or airport" />
        </div>

        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Date</span>
          <DatePicker classNameWrapper="flex items-center gap-2" className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent" selected={pickUp} onChange={value => updateData({ pickUp: value })} leftSide={<i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
        </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Guests</span>
        <Select iconName="icon-[bi--person-fill]" value={adults + children === 0 ? "" : `${adults + children} guests`} placeholder="Add guests" >
        <div className="space-y-5">
         <Guests label="Adults" max={100} min={1} value={adults} setValue={value => updateData({ adults: value })} />
        <Guests label="Children" max={100} min={0} value={children} setValue={value => updateData({ children: value })} /> 
        </div>
        </Select>
      </div> 

    </>
  );
}

export function Guests({ label, value, setValue, min, max }) {
  
  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue(value - 1)
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue(value + 1)
  };

  return <div className="flex justify-between gap-5">
  <span className="text-sm">{label}</span>
  <div className={`relative flex items-center justify-between w-20`} >
    <button className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-white transition-colors duration-300 focus:outline-hidden hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default" type="button" onClick={handleClickDecrement} disabled={min >= value} >
      -
    </button>
    <span className="absolute left-1/2 text-sm -translate-x-1/2">{value}</span>
    <button className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-white transition-colors duration-300 focus:outline-hidden hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default" type="button" onClick={handleClickIncrement} disabled={max ? max <= value : false} >
      +
    </button>
  </div>
</div>
}