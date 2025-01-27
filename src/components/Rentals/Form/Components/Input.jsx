import { Icon } from "@/components/Stateless/Icon"

export function Input({ value, setValue, iconName, type ="text", placeholder, required }) {
    return <>
    <Icon name={iconName} className="absolute top-[49px] left-5 text-text size-5" />
    <input type={type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} className="w-full p-4 pl-12 border border-border rounded-lg outline-none" required={required} />
    </>
}