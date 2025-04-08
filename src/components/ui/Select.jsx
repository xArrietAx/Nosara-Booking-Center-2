import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

export function Select({
  children,
  value,
  placeholder,
  required,
  className,
  triggerClassName,
  inputClassName,
  iconClassName,
  iconTwoClassName
}) {
  return (
    <Popover clickOutside>
      <PopoverTrigger type="button" className={triggerClassName}>
        { iconClassName && <i className={iconClassName} /> }
        <input
          type="text"
          required={required}
          className={`outline-hidden cursor-pointer caret-transparent ${inputClassName}`}
          value={value}
          onChange={() => {}}
          placeholder={placeholder}
          inputMode="none"
        />
        <div className="absolute z-50 w-full h-5" />
        { iconTwoClassName && <i className={iconTwoClassName} /> }
      </PopoverTrigger>
      <PopoverContent
        classNameWrapper="w-full"
        className={`w-full p-0! rounded-none mt-1 ${className}`}
      >
        {({ close }) => (
          <div className="flex flex-col max-h-36 overflow-hidden overflow-y-auto">
            <div className="flex flex-col">
              {typeof children === "function" ? children({ close }) : children}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
