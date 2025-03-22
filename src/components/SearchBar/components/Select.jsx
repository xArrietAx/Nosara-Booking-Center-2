import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

export function Select({ children, value, iconName, placeholder, name }) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className="flex flex-1 items-center gap-2 text-sm" >
       <i className={`${iconName} flex-none text-text/50 size-[17px]`} />
        <input type="text" name={name} required placeholder={placeholder} inputMode="none" className="w-24 font-bold outline-hidden cursor-pointer placeholder-black caret-transparent" value={value} onChange={() => {}} />
        <i className="icon-[ion--chevron-down] flex-none ml-auto" />
      </PopoverTrigger>
      <PopoverContent className="mt-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}