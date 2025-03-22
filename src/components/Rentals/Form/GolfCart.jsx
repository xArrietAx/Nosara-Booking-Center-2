import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "./Components/Select";

export function GolfCart({ data, updateData }) {

  const { pickUp, dropOff, seats } = data

  function Step1() {
    return <>
    <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">Passenger capacity</label>
        <Select required iconName="icon-[mage--user]" placeholder="Select seats" value={!seats ? "" : seats} >
          <div className="flex flex-col">
            <button type="button" className="bg-hover-secondary p-2! text-start" onClick={e => updateData({ seats: e.target.innerText })} >
              4 seats
            </button>
            <button type="button" className="bg-hover-secondary p-2! text-start" onClick={e => updateData({ seats: e.target.innerText })} >
              6 seats
            </button>
          </div>
        </Select>
      </div>
    </>
  }

  function Step2() {
    return <>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-md-bold">Pick up</label>
  <DatePicker classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white" className="w-full outline-hidden bg-transparent cursor-pointer" selected={pickUp} onChange={value => updateData({ pickUp: value })} leftSide={<i className="icon-[mage--calendar-2] top-3
     absolute left-2.5 size-[22px] text-text/50" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
</div>
    <div className="flex flex-col gap-2 w-full">
    <label className="text-md-bold">Drop off</label>
    <DatePicker classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white" className="w-full outline-hidden bg-transparent cursor-pointer" selected={dropOff} onChange={value => updateData({ dropOff: value })} leftSide={<i className="icon-[mage--calendar-2] top-3
     absolute left-2.5 size-[22px] text-text/50" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
  </div>
    </>
  }

  return [<Step1 key="step1" />, <Step2 key="step2" />];
}
