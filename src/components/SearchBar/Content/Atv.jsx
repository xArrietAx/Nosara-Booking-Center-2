import { MdPerson, MdOutlineMail } from "@/icons/index";
import { Datepicker } from "../components/DatePicker";
import { Input } from "../components/Input";

export function ATV({ name, setName, email, setEmail, pickUp, setPickUp, dropOff, setDropOff }) {
    return (
      <>
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={setPickUp} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={setDropOff} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Name</span>
          <Input Icon={<MdPerson className="text-text size-[1.1rem]" />} placeholder="Book under" value={name} setValue={setName} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Email</span>
          <Input Icon={<MdOutlineMail className="text-text size-[1.1rem]" />} placeholder="For contact you" value={email} setValue={setEmail} />
        </div>
      </>
    );
  }