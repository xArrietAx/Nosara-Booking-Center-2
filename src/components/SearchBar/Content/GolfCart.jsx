import { Datepicker } from "../components/DatePicker";
import { Select } from "../components/Select";
import { Input } from "../components/Input";
import { MdPerson } from "@/icons/index";

export function GolfCart({ name, setName, pickUp, setPickUp, dropOff, setDropOff, seats, setSeats }) {
    return (
      <>
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={setPickUp} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={setDropOff} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm text-text">Passenger capacity</span>
          <Select placeholder={seats === 0 ? "How many seats?" : `${seats} seats`} Icon={<MdPerson className="text-text size-[1.1rem]" />}>
          <div className="flex flex-col w-32 text-sm">
            <button className="bg-hover-secondary text-start" onClick={() => setSeats(4)}>4 seats</button>
            <button className="bg-hover-secondary text-start" onClick={() => setSeats(6)}>6 seats</button>
          </div>
          </Select>
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm text-text">Name</span>
          <Input Icon={<MdPerson className="text-text size-[1.1rem]" />} placeholder="Book under" value={name} setValue={setName} />
        </div>
      </>
    );
  }