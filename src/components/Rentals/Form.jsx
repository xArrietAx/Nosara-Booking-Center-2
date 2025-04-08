"use client";

import { filterEmptyValues } from "@/utils/filterEmptyValues";
import { BookingContext } from "@/context/BookingContext";
import { DatePicker } from "@/components/ui/DatePicker";
import { BookingForm } from "../Stateless/BookingForm";
import { Button } from "@/components/ui/Button";
import { useState, useContext } from "react";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Link from "next/link";

export function Form({ rent }) {
  const [isLoading, setLoading] = useState(false);

  const { data, updateData, reset } = useContext(BookingContext);

  const router = useRouter();

  async function handleSubmit(e, resetStepper) {
    try {
      e.preventDefault();
      setLoading(true);
      
      data.rent = rent.replace(/-/g, " ");
      data.pickUp = format(data.pickUp, "MM-dd-yyyy");
      data.dropOff = format(data.dropOff, "MM-dd-yyyy");

      const res = await fetch("/sendRentalEmail", {
        method: "POST",
        body: JSON.stringify(filterEmptyValues(data)),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const jsonData = await res.json();

      toast.success(jsonData.message);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
      resetStepper()
      reset();
    }
  }

  function WpMessage() {
    const bookingMessage = (() => {
      switch (rent) {
        case "ATV":
          return `Pick up: ${format(
            data?.pickUp,
            "MM-dd-yyyy"
          )}%0ADrop off: ${format(data?.dropOff, "MM-dd-yyyy")}`;
        case "Golf-cart":
          return `Passenger capacity: ${data?.seats}%0APick up: ${format(
            data?.pickUp,
            "MM-dd-yyyy"
          )}%0ADrop off: ${format(data?.dropOff, "MM-dd-yyyy")}`;
        case "Side-by-side":
          return `Passenger capacity: ${data?.seats}%0APick up: ${format(
            data?.pickUp,
            "MM-dd-yyyy"
          )}%0ADrop off: ${format(data?.dropOff, "MM-dd-yyyy")}`;
        default:
          return "";
      }
    })();

    return (
      `Name: ${data?.name}%0A` +
      `Email: ${data?.email}` +
      (data?.phone ? `%0APhone: ${data?.phone}` : "") +
      `%0A${bookingMessage}` +
      (data?.message ? `%0AMessage: ${data?.message}` : "")
    );
  }

  const handleWpSubmit = () => {
    const form = document.querySelector("form");
    if (form && !form.reportValidity()) return;

    router.push(
      `https://wa.me/50686012266?text=Hello Nosara Booking Center.%0A%0AThis is my information to book a ${rent.replace(
        /-/g,
        " "
      )}. %0A%0A${WpMessage()}`
    );
  };

  const steps = [
    <>
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Full Name</label>
        <Input
          required
          iconClassName="icon-[mage--user] absolute top-12 left-2.5 size-[22px] text-text/50" 
          placeholder="Full Name"
          className="p-3 pl-10 border border-border rounded-lg"
          value={data.name}
          setValue={(value) => updateData({ name: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Email</label>
        <Input
          required
          type="email"
          iconClassName="icon-[mage--email] absolute top-12 left-2.5 size-[22px] text-text/50"
          placeholder="Example@domain.com"
          className="p-3 pl-10 border border-border rounded-lg"
          value={data.email}
          setValue={(value) => updateData({ email: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Phone</label>
        <Input
          iconClassName="icon-[mage--phone] absolute top-12 left-2.5 size-[22px] text-text/50"
          type="tel"
          placeholder="+1 (207) 123 4567"
          className="p-3 pl-10 border border-border rounded-lg"
          value={data.phone}
          setValue={(value) => updateData({ phone: value })}
        />
      </div>

      {(rent === "Golf-cart" || rent === "Side-by-side") && (
        <div className="flex flex-col gap-2 w-full">
          <label className="text-md-bold">Passenger capacity</label>
          <Select
            required
            triggerClassName="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
            placeholder="Select seats"
            iconClassName="icon-[mage--user] absolute left-2.5 size-[22px] text-text/50"
            value={data.seats || ""}
          >
            {(close) =>
              rent === "Golf-cart" ? (
                <>
                  <Button
                    type="button"
                    radius="none"
                    size="sm"
                    variant="ghost"
                    className="justify-start"
                    onClick={(e) => {
                      updateData({ seats: e.target.innerText });
                      close();
                    }}
                  >
                    4 seats
                  </Button>
                  <Button
                    type="button"
                    radius="none"
                    size="sm"
                    variant="ghost"
                    className="justify-start"
                    onClick={(e) => {
                      updateData({ seats: e.target.innerText });
                      close();
                    }}
                  >
                    6 seats
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    radius="none"
                    size="sm"
                    variant="ghost"
                    className="justify-start"
                    onClick={(e) => {
                      updateData({ seats: e.target.innerText });
                      close();
                    }}
                  >
                    2 seats
                  </Button>
                  <Button
                    type="button"
                    radius="none"
                    size="sm"
                    variant="ghost"
                    className="justify-start"
                    onClick={(e) => {
                      updateData({ seats: e.target.innerText });
                      close();
                    }}
                  >
                    6 seats
                  </Button>
                </>
              )
            }
          </Select>
        </div>
      )}
    </>,
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">Pick up</label>
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
        <label className="text-md-bold">Drop off</label>
        <DatePicker
          classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
          className="w-full outline-hidden bg-transparent cursor-pointer"
          selected={data.dropOff}
          onChange={(value) => updateData({ dropOff: value })}
          leftSide={
            <i
              className="icon-[mage--calendar-2] top-3
         absolute left-2.5 size-[22px] text-text/50"
            />
          }
          rightSide={
            <i className="icon-[ion--chevron-down] flex-none ml-auto" />
          }
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">Your Message</label>
        <textarea
          type="text"
          placeholder="Leave us a message..."
          className="max-h-40 min-h-20 p-4 border border-border rounded-lg outline-hidden"
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
        >
          Book Now
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-md-medium text-text">OR</span>
          <Button
            isIconOnly="lg"
            type="button"
            className="hover:-translate-y-1"
            onClick={handleWpSubmit}
          >
            <i className="icon-[famicons--logo-whatsapp] size-7" />
          </Button>
        </div>
      </div>
    </>,
  ];

  return <BookingForm steps={steps} handleSubmit={handleSubmit} />;
}
