import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { HiChevronDown } from "@/icons/index";

export function Select({ children, placeholder, Icon }) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className="flex flex-1 items-center gap-1 text-sm" >
        {Icon}
        {placeholder}
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}
