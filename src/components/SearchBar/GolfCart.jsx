import { Datepicker } from "./components/DatePicker";
import { Input } from "./components/Input";
import { Select } from "./components/Select";

export function GolfCart({ data, updateData }) {

 const { name, pickUp, dropOff, seats } = data 

    return (
      <>
       <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={value => updateData({ pickUp: value })} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={value => updateData({ dropOff: value })} desactiveDate={pickUp} />          
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Passenger capacity</span>
          <Select iconName="MdPerson" value={!seats ? "" : seats} placeholder="Select seats">
          <div className="flex flex-col w-32">
            <button type="button" className="bg-hover-secondary p-2 text-start" onClick={({ target: {innerText} })=> updateData({ seats: innerText })} >4 seats</button>
            <button type="button" className="bg-hover-secondary p-2 text-start" onClick={({ target: {innerText} })=> updateData({ seats: innerText })} >6 seats</button>
          </div>
          </Select>
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Name</span>
          <Input value={name} setValue={value => updateData({ name: value })} iconName="MdPerson" placeholder="Full Name" />
        </div>
      </>
    );
}

