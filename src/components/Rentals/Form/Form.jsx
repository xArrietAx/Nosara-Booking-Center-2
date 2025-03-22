"use client";

import { useState, useContext, useEffect } from "react";
import { filterEmptyValues } from "@/utils/filterEmptyValues";
import { BookingContext } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { useHistory } from "@/hooks/useHistory";
import { Input } from "./Components/Input";
import { GolfCart } from "./GolfCart";
import toast from "react-hot-toast";
import Link from "next/link";
import { SideBySide } from "./SideBySide";
import { ATV } from "./Atv";
import { useMultistepForm } from "@/hooks/useMultistepForm";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

function getSteps(slug, data, updateData){
  switch (slug) {
    case "ATV":
      return ATV({data, updateData});
    case "Golf-cart":
      return GolfCart({data, updateData});
    case "Side-by-side":
      return SideBySide({ data, updateData });
    default:
      return [];
  }
};

export function Form({ slug }) {

  const [isLoading, setLoading] = useState(false);
  const { push } = useRouter()

  const { data, updateData, reset } = useContext(BookingContext);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back, goTo } = useMultistepForm(getSteps(slug, data, updateData));

  const { previousRoute, pathname } = useHistory();
 
  useEffect(() => {
    if (previousRoute.startsWith("/Rentals")) {
      return reset();
    }
  }, [pathname]);

  function WpMessage() {
    const bookingMessage = (() => {
      switch (slug) {
        case "ATV":
          return `Pick up: ${format(data?.pickUp, 'MM-dd-yyyy')}%0ADrop off: ${format(data?.dropOff, 'MM-dd-yyyy')}`;
        case "Golf-cart":
          return `Passenger capacity: ${data?.seats}%0APick up: ${format(data?.pickUp, 'MM-dd-yyyy')}%0ADrop off: ${format(data?.dropOff, 'MM-dd-yyyy')}`;
        case "Side-by-side":
          return `Passenger capacity: ${data?.seats}%0APick up: ${format(data?.pickUp, 'MM-dd-yyyy')}%0ADrop off: ${format(data?.dropOff, 'MM-dd-yyyy')}`;
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

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);

      data.rent = slug.replace(/-/g, " ")
      data.pickUp = format(data.pickUp, 'MM-dd-yyyy');
      data.dropOff = format(data.dropOff, 'MM-dd-yyyy');

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
      reset();
      goTo(0)
    }
  }

  const handleWpSubmit = () => {
    const form = document.querySelector("form");
    if (form && !form.reportValidity()) return; 
  
    push(`https://wa.me/50686012266?text=Hello Nosara Booking Center.%0A%0AThis is my information to book a ${slug.replace(/-/g," ")}. %0A%0A${WpMessage()}`);
  };

  return (
    <div className="sticky top-5 border border-border rounded-lg shadow-md">
    <div className="p-7 bg-secondary ">
      <span className="text-xl-bold">Booking Form</span>
    </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-7">
      
      {currentStepIndex + 1 === 1 && <><div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Full Name</label>
        <Input
          // required
          iconName="icon-[mage--user]"
          placeholder="Full Name"
          value={data.name}
          setValue={(value) => updateData({ name: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Email</label>
        <Input
          // required
          type="email"
          iconName="icon-[mage--email]"
          placeholder="Example@domain.com"
          value={data.email}
          setValue={(value) => updateData({ email: value })}
        />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-md-bold">Phone</label>
        <Input
          iconName="icon-[mage--phone]"
          type="tel"
          placeholder="+1 (207) 123 4567"
          value={data.phone}
          setValue={(value) => updateData({ phone: value })}
        />
      </div>
      </>
      
      }

      {step}
      
      {isLastStep && <>
        <div className="flex flex-col gap-2 w-full">
<label className="text-md-bold">
  Your Message
</label>
<textarea
  type="text"
  placeholder="Leave us a message..."
  className="max-h-40 min-h-20 p-4 border border-border rounded-lg outline-hidden"
  value={data.message} onChange={e => updateData({ message: e.target.value })}
/>
</div>

<div className="text-sm-medium flex items-center gap-2 text-text">
<input required type="checkbox" value={data.isAccepted} onChange={e => updateData({ isAccepted: e.target.checked })} />
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
<Button radius="smooth" loading={isLoading} className="w-full" hover="outline">Book Now</Button>
<div className="flex items-center gap-3">
  <span className="text-md-medium text-text">OR</span>
  <Button  isIconOnly="lg" className="hover:-translate-y-1" onClick={handleWpSubmit} >
    <i className="icon-[famicons--logo-whatsapp] size-7" />
  </Button>
</div>
</div>

      </>}

      <div className="flex items-center gap-3 !mt-8">
      {!isFirstStep && <Button type="button" isIconOnly="sm" variant="outline" className="" onClick={back} ><i className="icon-[ion--chevron-back]" /></Button>}
      <span className="text-sm-bold">{currentStepIndex + 1} / {steps.length}</span>
      {!isLastStep && <Button type="button" isIconOnly="sm" variant="outline" onClick={next} ><i className="icon-[ion--chevron-forward]" /></Button>}
      </div> 

    </form>
  </div>
  );
}


