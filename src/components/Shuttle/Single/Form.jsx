"use client";

import { BookingForm } from "@/components/Stateless/BookingForm";
import { filterEmptyValues } from "@/utils/filterEmptyValues";
import { BookingContext } from "@/context/BookingContext";
import { TimePicker } from "@/components/ui/TimePicker";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Link from "next/link";

export function Form({ type, route, price }) {
  const isAirport =
    route.split("-")[0].includes("LIR") || route.split("-")[0].includes("SJO");

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { data, updateData, reset } = useContext(BookingContext);

  function WpMessage() {
    let message = "";

    if (data?.name) message += `Name: ${data.name}%0A`;
    if (data?.email) message += `Email: ${data.email}%0A`;
    if (data?.phone) message += `Phone: ${data.phone}%0A`;
    if (data?.message) message += `Message: ${data.message}%0A`;
    if (data?.pickUp)
      message += `Date: ${format(data.pickUp, "MM-dd-yyyy")}%0A`;
    if (data?.pickUpTime)
      message += `Departure time: ${ type === "Shared" ? data.pickUpTime : format(data.pickUpTime, "HH:mm:ss")}%0A`;
    if (data?.pickUpLocation)
      message += `Pick up location: ${data.pickUpLocation}%0A`;
    if (data?.dropOffLocation)
      message += `Drop Off location: ${data.dropOffLocation}%0A`;
    if (data?.adults) message += `Adults: ${data.adults}%0A`;
    if (data?.children) message += `Children: ${data.children}%0A`;
    if (data?.childrenAge) message += `Children Age: ${data.childrenAge}%0A`;
    if (data?.luggages) message += `Luggages: ${data.luggages}%0A`;
    if (data?.surfboard) message += `Surfboard: ${data.surfboard}%0A`;
    if (data?.babySeat) message += `Baby Seat: ${data.babySeat}%0A`;
    if (data?.airline) message += `Airline: ${data.airline}%0A`;
    if (data?.flightNumber) message += `Flight Number: ${data.flightNumber}%0A`;
    if (data?.isAccepted !== undefined)
      message += `Is Accepted: ${data.isAccepted}%0A`;
    if (data?.route) message += `Route: ${data.route}`;

    return message;
  }

  async function handleSubmit(e, resetStepper) {
    try {
      e.preventDefault();
      setLoading(true);

      if (e.nativeEvent.submitter.name === "wpBtn") {
        router.push(
          `https://wa.me/50686012266?text=Hello Nosara Booking Center.%0A%0AThis is my information to book a ${type.toLowerCase()} shuttle from ${route.replace(
            /-/g,
            " to "
          )}. %0A%0A${WpMessage()}`
        )
        
      } else {
        data.route = route.replace(/-/g, " to ");
        data.date = format(data.pickUp, "MM-dd-yyyy");
        delete data.pickUp;
  
        if (type === "Shared") {
          data.departureTime = data.pickUpTime;
        } else {
          data.departureTime = format(data.pickUpTime, "HH:mm:ss");
        }
        delete data.pickUpTime;
  
        const res = await fetch("/sendShuttleEmail", {
          method: "POST",
          body: JSON.stringify(filterEmptyValues(data)),
        });
  
        if (!res.ok) {
          throw new Error(res.statusText);
        }
  
        const jsonData = await res.json();
  
        toast.success(jsonData.message);
      }

    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      resetStepper();
      reset();
    }
  }

  const steps = [
    <>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Full Name <span className="text-sm text-red-500">*</span>
        </label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          required
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="Full Name"
          value={data.name}
          setValue={(value) => updateData({ name: value })}
        />
      </div>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Email <span className="text-sm text-red-500">*</span>
        </label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          required
          type="email"
          iconClassName="icon-[mage--email] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="Example@domain.com"
          value={data.email}
          setValue={(value) => updateData({ email: value })}
        />
      </div>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Phone</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[mage--phone] absolute top-12 left-2.5 size-[22px] text-text/50"
          type="tel"
          placeholder="+1 (207) 123 4567"
          value={data.phone}
          setValue={(value) => updateData({ phone: value })}
        />
      </div>
    </>,
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Date <span className="text-sm text-red-500">*</span>
        </label>
        <DatePicker
          classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
          className="w-full outline-hidden bg-transparent cursor-pointer"
          selected={data.pickUp}
          onChange={(value) => updateData({ pickUp: value })}
          leftSide={
            <i className="icon-[mage--calendar-2] top-3 absolute left-2.5 size-[22px] text-text/50" />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Departure time <span className="text-sm text-red-500">*</span>
        </label>
        {type === "Shared" ? (
          <Select
            required
            iconClassName="icon-[mage--alarm-clock] absolute left-2.5 size-[22px] text-text/50"
            triggerClassName="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
            placeholder="Select a time"
            value={data.pickUpTime || ""}
          >
            {({ close }) => {
              return (
                <>
                  {[...new Set(price?.options.map((item) => item.time))].map(
                    (time, i) => (
                      <Button
                        key={i}
                        type="button"
                        radius="none"
                        size="sm"
                        variant="ghost"
                        className="justify-start"
                        onClick={(e) => {
                          updateData({ pickUpTime: e.target.innerText });
                          close();
                        }}
                      >
                        {time}
                      </Button>
                    )
                  )}
                </>
              );
            }}
          </Select>
        ) : (
          <TimePicker
            classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
            className="w-full outline-hidden bg-transparent cursor-pointer"
            selected={data.pickUpTime}
            onChange={(value) => updateData({ pickUpTime: value })}
            leftSide={
              <i className="icon-[mage--alarm-clock] top-3 absolute left-2.5 size-[22px] text-text/50" />
            }
            rightSide={
              <i className="icon-[ion--chevron-down] flex-none ml-auto" />
            }
          />
        )}
      </div>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Pick up <span className="text-sm text-red-500">*</span>
        </label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          required
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="Nosara"
          value={data.pickUpLocation}
          setValue={(value) => updateData({ pickUpLocation: value })}
        />
      </div>
    </>,
    <>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Drop off <span className="text-sm text-red-500">*</span>
        </label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          required
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="LIR"
          value={data.dropOffLocation}
          setValue={(value) => updateData({ dropOffLocation: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Adults <span className="text-sm text-red-500">*</span>
        </label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          required
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="2"
          type="number"
          value={data.adults === 0 ? "" : data.adults}
          setValue={(value) => updateData({ adults: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Children</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          type="number"
          placeholder="1"
          value={data.children === 0 ? "" : data.children}
          setValue={(value) => updateData({ children: value })}
        />
      </div>
    </>,
    <>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Children ages</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="3,6,2"
          value={data.childrenAge}
          required={!data.children || data.children === "0" ? false : true}
          setValue={(value) => updateData({ childrenAge: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Baby seat</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[ph--seat-light] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="1"
          value={data.babySeat}
          setValue={(value) => updateData({ babySeat: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Luggages</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[mage--briefcase] absolute top-12 left-2.5 size-[22px] text-text/50"
          type="number"
          min={0}
          max={30}
          placeholder="1"
          value={data.luggages}
          setValue={(value) => updateData({ luggages: value })}
        />
      </div>
    </>,
    <>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Surfboard</label>
        <Input
          className="p-3 pl-10 border border-border rounded-lg"
          iconClassName="icon-[hugeicons--surfboard] absolute top-12 left-2.5 size-[22px] text-text/50"
          type="number"
          placeholder="1"
          value={data.surfboard}
          setValue={(value) => updateData({ surfboard: value })}
        />
      </div>

      {isAirport && (
        <>
          <div className="relative flex flex-col gap-2 w-full">
            <label className="text-md-bold">
              Flight number <span className="text-sm text-red-500">*</span>
            </label>
            <Input
              className="p-3 pl-10 border border-border rounded-lg"
              required
              iconClassName="icon-[solar--ticket-broken] absolute top-12 left-2.5 size-[22px] text-text/50"
              placeholder="AV123"
              value={data.flightNumber}
              setValue={(value) => updateData({ flightNumber: value })}
            />
          </div>

          <div className="relative flex flex-col gap-2 w-full">
            <label className="text-md-bold">
              Airline <span className="text-sm text-red-500">*</span>
            </label>
            <Input
              className="p-3 pl-10 border border-border rounded-lg"
              required
              iconClassName="icon-[mage--aeroplane] absolute top-12 left-2.5 size-[22px] text-text/50"
              placeholder="WesJet"
              value={data.airline}
              setValue={(value) => updateData({ airline: value })}
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">Your Message</label>
        <textarea
          type="text"
          placeholder="Leave us a message..."
          className="min-h-24 p-4 border border-border rounded-lg outline-hidden resize-none"
          value={data.message}
          onChange={(e) => updateData({ message: e.target.value })}
        />
      </div>

      <div className="text-sm-medium flex items-center gap-2 text-text">
        <input
          required
          type="checkbox"
          value={data.isAccepted}
          onChange={(e) => updateData({ isAccepted: e.target.checked })}
        />
        <label>
          Agree to our{" "}
          <Link href="/Terms-conditions" className="link font-bold text-black">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link href="/Privacy-policy" className="link font-bold text-black">
            Privacy Policy
          </Link>
        </label>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button
          radius="smooth"
          loading={isLoading}
          className="w-full"
          hover="outline"
          name="emailBtn"
          disabled={isLoading}
        >
          Book Now
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-md-medium text-text">OR</span>
          <Button
            isIconOnly="lg"
            className="hover:-translate-y-1"
            name="wpBtn"
            disabled={isLoading}
          >
            <i className="icon-[famicons--logo-whatsapp] size-7" />
          </Button>
        </div>
      </div>
    </>,
  ];

  return <BookingForm steps={steps} handleSubmit={handleSubmit} />;
}