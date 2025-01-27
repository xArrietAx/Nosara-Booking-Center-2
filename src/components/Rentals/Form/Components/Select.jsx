import { Icon } from "@/components/Stateless/Icon";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/Popover";
  import { HiChevronDown } from "@/icons/index";
  
  export function Select({ children, value, iconName, placeholder, required }) {
    return (
      <Popover clickOutside>
      <PopoverTrigger type="button" className="relative flex items-center w-full p-4 pl-12 border border-border rounded-lg bg-white">
              <Icon name={iconName} className="absolute top-[17px] left-5 text-text size-5" />
              <input type="text" required={required} className="outline-none cursor-pointer" value={value}
                onChange={() => {}} placeholder={placeholder} />
              <HiChevronDown className="ml-auto size-[1.1rem]" />
            </PopoverTrigger>
        <PopoverContent classNameWrapper="w-full" className="mt-1">

        <div className="flex flex-col max-h-36 overflow-hidden overflow-y-auto"> 

        <div className="flex flex-col mr-2">
          {children}
        </div>
        </div>


        </PopoverContent>
      </Popover>
    );
  }
  