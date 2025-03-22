import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "./components/Input";

export function ATV({ data, updateData }) {

 const { name, email, pickUp, dropOff } = data 

    return (
      <>

       <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Name</span>
          <Input value={name} setValue={value => updateData({ name: value })} iconName="icon-[bi--person-fill]" iconClassName="size-[17px]" placeholder="Full Name" />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Email</span>
          <Input value={email} type="email" setValue={value => updateData({ email: value })} iconName="icon-[tabler--mail-filled]" iconClassName="size-[17px]" placeholder="Example@domain.com" />
        </div>

        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <DatePicker classNameWrapper="flex items-center gap-2" className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent" selected={pickUp} onChange={value => updateData({ pickUp: value })} leftSide={<i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <DatePicker classNameWrapper="flex items-center gap-2" className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent" selected={dropOff} onChange={value => updateData({ dropOff: value })} leftSide={<i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />} rightSide={<i className="icon-[ion--chevron-down] flex-none ml-auto" />} />         
        </div>
   
      </>
    );
  }