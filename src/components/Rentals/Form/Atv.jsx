import { DatePicker } from "@/components/ui/DatePicker";

export function ATV({ data, updateData }) {

  const { pickUp, dropOff } = data;

  function Step1() {
    return (
      <>
  <div className="flex flex-col gap-2 w-full">
  <label className="text-md-bold">Pick up</label>
  <DatePicker classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white" className="w-full outline-hidden bg-transparent cursor-pointer" 
  selected={pickUp} 
  onChange={value => updateData({ pickUp: value })} 
  leftSide={<i className="icon-[mage--calendar-2] top-3 absolute left-2.5 size-[22px] text-text/50" />} 
  rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
</div>
    <div className="flex flex-col gap-2 w-full">
    <label className="text-md-bold">Drop off</label>
    <DatePicker classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white" className="w-full outline-hidden bg-transparent cursor-pointer" selected={dropOff} onChange={value => updateData({ dropOff: value })} leftSide={<i className="icon-[mage--calendar-2] top-3
     absolute left-2.5 size-[22px] text-text/50" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
  </div>
    </>
    );
  }

  return [null, <Step1 key="step1" />];
}
