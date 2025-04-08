import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

export function SideBySide({ data, updateData }) {
  const { pickUp, dropOff, name, seats } = data;

  return (
    <>
      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Name</span>
        <Input 
          classNameWrapper="flex flex-1 items-center gap-2 text-sm"
          className="font-bold cursor-pointer bg-transparent placeholder-black"
          iconClassName="icon-[bi--person-fill] flex-none text-text/50 size-[17px]"
          value={name}
          setValue={(value) => updateData({ name: value })}
          placeholder="Full Name"
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Pick up</span>
        <DatePicker
          classNameWrapper="flex items-center gap-2"
          className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent"
          selected={pickUp}
          onChange={(value) => updateData({ pickUp: value })}
          leftSide={
            <i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Drop off</span>
        <DatePicker
          classNameWrapper="flex items-center gap-2"
          className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent"
          selected={dropOff}
          onChange={(value) => updateData({ dropOff: value })}
          leftSide={
            <i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Passenger capacity</span>
        <Select
          iconClassName="icon-[bi--person-fill] flex-none text-text/50 size-[17px]"
          iconTwoClassName="icon-[ion--chevron-down] flex-none ml-auto"
          value={!seats ? "" : seats}
          triggerClassName="flex flex-1 items-center gap-2"
          placeholder="Select seats"
          inputClassName="w-24 text-sm-bold placeholder-black"
        >
          {(close) => (
            <div className="flex flex-col text-sm">
              <Button
                type="button"
                className="justify-start"
                radius="none"
                size="sm"
                variant="ghost"
                onClick={({ target: { innerText } }) => {
                  updateData({ seats: innerText }), close();
                }}
              >
                2 seats
              </Button>
              <Button
                type="button"
                className="justify-start"
                radius="none"
                size="sm"
                variant="ghost"
                onClick={({ target: { innerText } }) => {
                  updateData({ seats: innerText }), close();
                }}
              >
                6 seats
              </Button>
            </div>
          )}
        </Select>
      </div>
    </>
  );
}
