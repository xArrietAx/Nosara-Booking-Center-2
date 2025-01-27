import { Icon } from "@/components/Stateless/Icon"

export function Input({ value, setValue, iconName, placeholder, type="text" }) {
    return <div className="flex flex-1 items-center gap-1 text-sm">
        <Icon name={iconName} className="flex-none text-text size-[1.1rem]" />
    <input type={type} required placeholder={placeholder} className="w-full font-bold outline-none cursor-pointer bg-transparent placeholder-black" value={value} onChange={e => setValue(e.target.value)} />
  </div>
}