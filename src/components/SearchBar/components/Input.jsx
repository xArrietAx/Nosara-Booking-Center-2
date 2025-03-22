export function Input({ value, setValue, iconName, iconClassName = "size-4", placeholder, type="text"}) {
    return <div className="flex flex-1 items-center gap-2 text-sm">
      <i className={`${iconName} flex-none text-text/50 ${iconClassName}`} />
    <input type={type} required placeholder={placeholder} className="w-full font-bold outline-hidden cursor-pointer bg-transparent placeholder-black" value={value} onChange={e => setValue(e.target.value)} />
  </div>
}