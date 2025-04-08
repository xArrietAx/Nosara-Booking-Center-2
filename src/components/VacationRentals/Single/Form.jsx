"use client";

import { BookingForm } from "@/components/Stateless/BookingForm";
import { filterEmptyValues } from "@/utils/filterEmptyValues";
import { BookingContext } from "@/context/BookingContext";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Link from "next/link";

export function Form({ house }) {

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const { data, updateData, reset } = useContext(BookingContext);

  async function handleSubmit(e, resetStepper) {
    try {
      e.preventDefault();
      setLoading(true);

      data.house = house.replace(/-/g, " ");
      data.checkIn = format(data.checkIn, "MM-dd-yyyy");
      data.checkOut = format(data.checkOut, "MM-dd-yyyy")

      const res = await fetch("/sendHouseEmail", {
        method: "POST",
        body: JSON.stringify(filterEmptyValues(data)),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const jsonData = await res.json();

      console.log(jsonData);
      

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
    let message = "";

    if (data?.name) message += `Name: ${data.name}%0A`;
    if (data?.email) message += `Email: ${data.email}%0A`;
    if (data?.phone) message += `Phone: ${data.phone}%0A`;
    if (data?.message) message += `Message: ${data.message}%0A`;
    if (data?.adults) message += `Adults: ${data.adults}%0A`;
    if (data?.children) message += `Children: ${data.children}%0A`;
    if (data?.childrenAge) message += `Children Age: ${data.childrenAge}%0A`;
    if (data?.checkIn) message += `Check in: ${format(data.checkIn, "MM-dd-yyyy")}%0A`;
    if (data?.checkOut) message += `Check Out: ${format(data.checkOut, "MM-dd-yyyy")}%0A`;

    return message;
}

  const handleWpSubmit = () => {
    const form = document.querySelector("form");
    if (form && !form.reportValidity()) return;

    router.push(
      `https://wa.me/50686012266?text=Hello Nosara Booking Center.%0A%0AThis is my information to book ${house.replace("-", " ")}. %0A%0A${WpMessage()}`
    );
  };

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
          value={data.adults === 0 ? "" : data.adults }
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
          value={data.children  === 0 ? "" : data.children}
          setValue={(value) => updateData({ children: value })}
        />
      </div>
      
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
    </>,
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-md-bold">
          Check in <span className="text-sm text-red-500">*</span>
        </label>
        <DatePicker
          classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
          className="w-full outline-hidden bg-transparent cursor-pointer"
          selected={data.checkIn}
          onChange={(value) => updateData({ checkIn: value })}
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
          Check out <span className="text-sm text-red-500">*</span>
        </label>
        <DatePicker
          classNameWrapper="relative flex items-center w-full p-3 pl-10 border border-border rounded-lg bg-white"
          className="w-full outline-hidden bg-transparent cursor-pointer"
          selected={data.checkOut}
          onChange={(value) => updateData({ checkOut: value })}
          leftSide={
            <i className="icon-[mage--calendar-2] top-3 absolute left-2.5 size-[22px] text-text/50" />
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
