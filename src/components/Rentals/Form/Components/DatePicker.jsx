import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { MdCalendarMonth, HiChevronDown } from "@/icons/index";
import { format, addDays } from "date-fns";
import DatePicker from "react-datepicker";

export function Datepicker({ selected, setSelected, desactiveDate }) {

  return (
    <Popover clickOutside className="justify-center min-[490px]:justify-normal">
      <PopoverTrigger type="button" className="relative flex items-center w-full p-4 pl-12 border border-border rounded-lg bg-white">
        <MdCalendarMonth className="absolute top-[19px] left-5 text-text size-5" />
        <input type="text" required className="outline-none bg-transparent cursor-pointer" value={selected ? format(selected, "MM-dd-yyyy") : ""}
          onChange={() => {}} placeholder="Select a date" />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        <DatePicker
          inline
          selected={selected}
          minDate={desactiveDate ? addDays(new Date(desactiveDate), 1) : new Date()}
          onChange={(date) => setSelected(date)}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="datepicker-header">
              <button
                type="button"
                className="react-datepicker__navigation react-datepicker__navigation--previous"
                onClick={decreaseMonth}
                aria-label="Previous Month"
              >
                <HiChevronDown className="size-6 rotate-90" />
              </button>
              <div className="font-semibold">
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                type="button"
                className="react-datepicker__navigation react-datepicker__navigation--next"
                onClick={increaseMonth}
                aria-label="Next Month"
              >
                <HiChevronDown className="size-6 -rotate-90" />
              </button>
            </div>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
