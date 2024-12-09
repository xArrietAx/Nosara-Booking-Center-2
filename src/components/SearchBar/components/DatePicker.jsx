import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { MdCalendarMonth, HiChevronDown } from "@/icons/index";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

export function Datepicker({ selected, setSelected }) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className="flex flex-1 items-center gap-1 text-sm">
        <MdCalendarMonth className="text-text size-[1.1rem]" />{" "}
        <input
          type="text"
          className="w-28 outline-none cursor-pointer"
          value={selected ? format(selected, "MM-dd-yyyy") : "Select a date"}
          readOnly
        />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
      </PopoverContent>
    </Popover>
  );
}
