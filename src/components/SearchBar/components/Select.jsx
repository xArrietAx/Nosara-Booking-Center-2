import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Icon } from "@/components/Stateless/Icon";
import { HiChevronDown } from "@/icons/index";

export function Select({ children, value, iconName, placeholder, name }) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className="flex flex-1 items-center gap-1 text-sm" >
        <Icon name={iconName} className="flex-none text-text size-[1.1rem]" />
        <input type="text" name={name} required placeholder={placeholder} className="w-24 font-bold outline-none cursor-pointer placeholder-black caret-transparent" value={value} onChange={() => {}} />
        <HiChevronDown className="ml-auto size-[1.1rem]" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}