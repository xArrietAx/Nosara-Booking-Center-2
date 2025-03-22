
export function Input({ value, setValue, iconName, type ="text", placeholder, required }) {
    return <>
     <i className={`${iconName} absolute top-12 left-2.5 size-[22px] text-text/50`} />
    <input type={type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} className="w-full p-3 pl-10 border border-border rounded-lg outline-hidden" required={required} />
    </>
}