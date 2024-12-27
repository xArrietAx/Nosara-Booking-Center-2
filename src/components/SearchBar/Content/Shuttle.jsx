import { MdLocationPin, MdPerson } from "@/icons/index";
import { Datepicker } from "../components/DatePicker";
import { Select } from "../components/Select";
import { Input } from "../components/Input";

export function Shuttle({ pickUp, setPickUp, pickUpLocation, setPickUpLocation, dropOffLocation, setDropOffLocation, adults, setAdults, childrens, setChildrens }) {
  return (
    <>
      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Pick up location</span>
        <Input value={pickUpLocation} setValue={setPickUpLocation} Icon={<MdLocationPin className="text-text size-[1.1rem]" />} placeholder="City or airport" />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Drop off location</span>
        <Input value={dropOffLocation} setValue={setDropOffLocation} Icon={<MdLocationPin className="text-text size-[1.1rem]" />} placeholder="City or airport" />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Date</span>
        <Datepicker selected={pickUp} setSelected={setPickUp} />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Guests</span>
        <Select value={adults + childrens === 0 ? "" : `${adults + childrens} guests`} placeholder="Add guests" Icon={<MdPerson className="text-text size-[1.1rem]" />} >
        <div className="space-y-5 w-">
        <Guests label="Adults" value={adults} setValue={setAdults} max={100} min={1}  />
        <Guests label="Children" value={childrens} setValue={setChildrens} max={100} min={0} />
        </div>
        </Select>
      </div>
    </>
  );
}

function Guests({ label, value, setValue, min, max }) {

  const handleClickDecrement = () => {
    if (min >= value) return;
    setValue((state) => {
      return state - 1;
    });
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    setValue((state) => {
      return state + 1;
    });
  };

  return <div className="flex justify-between gap-5">
  <span className=" text-sm">{label}</span>

  <div className={`relative flex items-center justify-between w-20`} >
    <button
      className="w-6 h-6 rounded-full flex items-center justify-center border border-border bg-white transition-colors duration-300 focus:outline-none hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default"
      type="button" onClick={handleClickDecrement} disabled={min >= value}
    >
      -
    </button>
    <span className="absolute left-1/2 text-sm -translate-x-1/2">{value}</span>
    <button
      className="w-6 h-6 rounded-full flex items-center justify-center border border-border bg-white transition-colors duration-300 focus:outline-none hover:border-primary disabled:hover:border-border disabled:opacity-50 disabled:cursor-default"
      type="button" onClick={handleClickIncrement} disabled={max ? max <= value : false}
    >
      +
    </button>
  </div>

</div>
}