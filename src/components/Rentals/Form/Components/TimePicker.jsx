import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { LuClock, HiChevronDown } from "@/icons/index";
import { format, addDays } from "date-fns";
import DatePicker from "react-datepicker";

export function Timepicker({ selected, setSelected }) {

  return (
    <Popover clickOutside className="justify-center min-[490px]:justify-normal">
      <PopoverTrigger type="button" className="relative flex items-center w-full p-4 pl-12 border border-border rounded-lg bg-white">
        <LuClock className="absolute top-[19px] left-5 text-text size-5" />
        <input type="text" required className="outline-none bg-transparent cursor-pointer" value={selected ? format(selected, "h:mm aa") : ""}
          onChange={() => {}} placeholder="Select a date" />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent classNameWrapper="w-full" className="mt-2">
        <div className="flex flex-col max-h-36 overflow-hidden overflow-y-auto">
            <div className="flex flex-col mr-2">
      <DatePicker
          inline
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          showTimeCaption={false}
          dateFormat="h:mm aa"
          selected={selected}
          className="w-full"
          onChange={(time) => setSelected(time)}
        />
            </div>
          </div>
      </PopoverContent>
    </Popover>
  );
}
