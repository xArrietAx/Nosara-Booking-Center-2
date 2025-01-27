import { Datepicker } from "./components/DatePicker";
import { Input } from "./components/Input";

export function ATV({ data, updateData }) {

 const { name, email, pickUp, dropOff } = data 

    return (
      <>
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Pick up</span>
          <Datepicker selected={pickUp} setSelected={value => updateData({ pickUp: value })} />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Drop off</span>
          <Datepicker selected={dropOff} setSelected={value => updateData({ dropOff: value })} desactiveDate={pickUp} />          
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Name</span>
          <Input value={name} setValue={value => updateData({ name: value })} iconName="MdPerson" placeholder="Full Name" />
        </div>
  
        <div className="flex flex-col gap-3 px-7 py-5 border-b border-border font-bold sm:border-0 xl:py-0">
          <span className="text-sm-bold text-text">Email</span>
          <Input value={email} type="email" setValue={value => updateData({ email: value })} iconName="MdOutlineMail" placeholder="Example@domain.com" />
        </div>
      </>
    );
  }