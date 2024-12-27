import { Datepicker } from "../components/DatePicker";
import { Input } from "../components/Input";
import { MdLocationPin } from "@/icons/index";

export function Car({ pickUp, setPickUp, dropOff, setDropOff, pickUpLocation, setPickUpLocation, dropOffLocation, setDropOffLocation }) {
    return (
      <>
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up location</span>
           <Input Icon={<MdLocationPin className="text-text size-[1.1rem]" />} placeholder="City or airport" value={pickUpLocation} setValue={setPickUpLocation} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off location</span>
           <Input Icon={<MdLocationPin className="text-text size-[1.1rem]" />} placeholder="City or airport" value={dropOffLocation} setValue={setDropOffLocation} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={setPickUp} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={setDropOff} />
        </div>
      </>
    ); 
  }
  