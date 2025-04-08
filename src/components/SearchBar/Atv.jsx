import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/Input";

export function ATV({ data, updateData }) {
  const { name, email, pickUp, dropOff } = data;

  return (
    <>
      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Name</span>
        <Input
          classNameWrapper="flex flex-1 items-center gap-2 text-sm"
          className="font-bold cursor-pointer bg-transparent placeholder-black"
          iconClassName="icon-[bi--person-fill] flex-none text-text/50 size-[17px]"
          value={name}
          setValue={(value) => updateData({ name: value })}
          placeholder="Full Name"
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Email</span>
        <Input
          classNameWrapper="flex flex-1 items-center gap-2 text-sm"
          className="font-bold cursor-pointer bg-transparent placeholder-black"
          iconClassName="icon-[tabler--mail-filled] flex-none text-text/50 size-[17px]"
          value={email}
          type="email"
          setValue={(value) => updateData({ email: value })}
          placeholder="Example@domain.com"
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Pick up</span>
        <DatePicker
          classNameWrapper="flex items-center gap-2"
          className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent"
          selected={pickUp}
          onChange={(value) => updateData({ pickUp: value })}
          leftSide={
            <i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>

      <div className="flex flex-col gap-3 px-7 py-5 border-b border-border sm:border-0 xl:py-0">
        <span className="text-sm-bold text-text">Drop off</span>
        <DatePicker
          classNameWrapper="flex items-center gap-2"
          className="w-full !font-bold outline-hidden text-sm cursor-pointer bg-transparent placeholder-black caret-transparent"
          selected={dropOff}
          onChange={(value) => updateData({ dropOff: value })}
          leftSide={
            <i className="icon-[ri--calendar-schedule-fill] flex-none text-text/50 size-[17px]" />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>
    </>
  );
}
