import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { HiChevronDown } from "@/icons/index";

export function Select({ children, value, placeholder, Icon }) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className="flex flex-1 items-center gap-1 text-sm" >
        {Icon}
        <input type="text" placeholder={placeholder} required className="w-24 font-bold outline-none cursor-pointer placeholder:text-black" value={value} onChange={() => {}} />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}
