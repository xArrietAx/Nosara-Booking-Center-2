import { Datepicker } from "./Components/DatePicker";
import { Timepicker } from "./Components/TimePicker";
import { Select } from "./Components/Select";
import { Input } from "./Components/Input";

export function Car({ data, updateData }) {

  const { pickUp, dropOff, pickUpTime, dropOffTime, pickUpLocation, dropOffLocation, carType, seats } =
    data;

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Car type</label>
        <Select
          required
          iconName="MdOutlineDirectionsCar"
          placeholder="Select car type"
          value={!carType ? "" : carType} 
        >
        
              <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Mini
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Small
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Compact
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Intermediate
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Standard
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Compact suv
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Intermediate suv
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Standard suv
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Full size suv
            </button>

            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ carType: e.target.innerText })}
            >
              Premium suv
            </button>
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Passenger capacity</label>
        <Select
          required
          iconName="MdPersonOutline"
          placeholder="Select seats"
          value={!seats ? "" : seats}
        >
            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ seats: e.target.innerText })}
            >
              5 seats
            </button>
            <button
              type="button"
              className="bg-hover-secondary p-2 text-start"
              onClick={(e) => updateData({ seats: e.target.innerText })}
            >
              7 seats
            </button>
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Pick up</label>
        <Datepicker
          selected={pickUp}
          setSelected={(value) => updateData({ pickUp: value })}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Drop off</label>
        <Datepicker
          selected={dropOff}
          setSelected={(value) => updateData({ dropOff: value })}
          desactiveDate={pickUp}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Pick up time</label>
        <Timepicker selected={pickUpTime} setSelected={value => updateData({ pickUpTime: value })} />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Drop off time</label>
        <Timepicker selected={dropOffTime} setSelected={value => updateData({ dropOffTime: value })} />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Pick up Location</label>
        <Input
          required
          iconName="MdOutlineLocationOn"
          placeholder="Location"
          value={pickUpLocation}
          setValue={(value) => updateData({ pickUpLocation: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">Drop off Location</label>
        <Input
          required
          iconName="MdOutlineLocationOn"
          placeholder="Location"
          value={dropOffLocation}
          setValue={(value) => updateData({ dropOffLocation: value })}
        />
      </div>
    </>
  );
}
