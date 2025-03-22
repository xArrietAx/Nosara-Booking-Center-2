import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/Popover";

  export function Select({ children, value, iconName, placeholder, required }) {
    return (
      <Popover clickOutside>
      <PopoverTrigger type="button" className="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white">
      <i className={`${iconName} absolute left-2.5 size-[22px] text-text/50`} />
              <input type="text" required={required} className="outline-hidden cursor-pointer" value={value}
                onChange={() => {}} placeholder={placeholder} />
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
  