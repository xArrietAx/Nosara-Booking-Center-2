import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { MdCalendarMonth, HiChevronDown } from "@/icons/index";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

export function Datepicker({ selected, setSelected }) {

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    return date < today;
  };

  return (
    <Popover clickOutside>
      <PopoverTrigger
        type="button"
        className="flex flex-1 items-center gap-1 text-sm"
      >
        <MdCalendarMonth className="text-text size-[1.1rem]" />{" "}
        <input
          type="text"
          required
          className="w-24 font-bold outline-none cursor-pointer placeholder:text-black"
          value={selected ? format(selected, "MM-dd-yyyy") : ""}
          onChange={() => {}}
          placeholder="Select a date"
        />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        <DatePicker
          inline
          selected={selected}
          filterDate={(date) => !isPastDate(date)}
          onChange={(date) => setSelected(date)}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div className="datepicker-header">
              <button type="button"
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
              <button type="button"
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
