import { Datepicker } from "@/components/Rentals/Form/Components/DatePicker";

export function ATV({ data, updateData }) {

  const { pickUp, dropOff } = data

  return (
    <>
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
