export function Input({ value, setValue, Icon, placeholder }) {
    return <div className="flex flex-1 items-center gap-1 text-sm">
    <div>
    {Icon}
    </div>
    <input type="text" placeholder={placeholder} className="w-full outline-none cursor-pointer placeholder:text-black" value={value} onChange={e => setValue(e.target.value)} />
  </div>
}