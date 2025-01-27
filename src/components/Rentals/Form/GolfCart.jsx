import { Datepicker } from "@/components/Rentals/Form/Components/DatePicker";
import { Select } from "./Components/Select";

export function GolfCart({ data, updateData }) {

  const { pickUp, dropOff, seats } = data

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Passenger capacity</label>
        <Select required iconName="MdPersonOutline" placeholder="Select seats" value={!seats ? "" : seats} >
          <div className="flex flex-col">
            <button type="button" className="bg-hover-secondary p-2 text-start" onClick={e => updateData({ seats: e.target.innerText })} >
              4 seats
            </button>
            <button type="button" className="bg-hover-secondary p-2 text-start" onClick={e => updateData({ seats: e.target.innerText })} >
              6 seats
            </button>
          </div>
        </Select>
      </div>

     <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Pick up</label>
        <Datepicker selected={pickUp} setSelected={value => updateData({ pickUp: value })} />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Drop off</label>
        <Datepicker selected={dropOff} setSelected={value => updateData({ dropOff: value })} desactiveDate={pickUp} />        
      </div>
    </>
  );
}
