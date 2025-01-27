import { Datepicker } from "./components/DatePicker";
import { Input } from "./components/Input";

export function Car({ data, updateData }) {

  const { pickUp, dropOff, pickUpLocation, dropOffLocation } = data 

    return (
      <>
       <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up location</span>
          <Input value={pickUpLocation} setValue={value => updateData({ pickUpLocation: value })} iconName="MdLocationPin" placeholder="City or airport" />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off location</span>
          <Input value={dropOffLocation} setValue={value => updateData({ dropOffLocation: value })} iconName="MdLocationPin" placeholder="City or airport" />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={value => updateData({ pickUp: value })} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={value => updateData({ dropOff: value })} desactiveDate={pickUp} />          
        </div>
  
      </>
    ); 
  }
  