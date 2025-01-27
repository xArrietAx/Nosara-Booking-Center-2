import { Datepicker } from "./components/DatePicker";
import { Input } from "./components/Input";
import { Select } from "./components/Select";

export function Shuttle({ data, updateData }) {

 const { pickUp, pickUpLocation, dropOffLocation, adults, children } = data 

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
          <span className="text-sm-bold text-text">Date</span>
          <Datepicker selected={pickUp} setSelected={value => updateData({ pickUp: value })} name="pickUp" />
        </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Guests</span>
        <Select iconName="MdPerson" value={adults + children === 0 ? "" : `${adults + children} guests`} placeholder="Add guests" >
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
  <span className=" text-sm">{label}</span>
  <div className={`relative flex items-center justify-between w-20`} >
    <button className="w-6 h-6 rounded-full flex items-center justify-center border border-border bg-white transition-colors duration-300 focus:outline-none hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default" type="button" onClick={handleClickDecrement} disabled={min >= value} >
      -
    </button>
    <span className="absolute left-1/2 text-sm -translate-x-1/2">{value}</span>
    <button className="w-6 h-6 rounded-full flex items-center justify-center border border-border bg-white transition-colors duration-300 focus:outline-none hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default" type="button" onClick={handleClickIncrement} disabled={max ? max <= value : false} >
      +
    </button>
  </div>
</div>
}