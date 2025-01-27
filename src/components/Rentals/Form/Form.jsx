"use client"

import { useState, useContext, useEffect } from "react";
import { filterEmptyValues } from "@/utils/filterEmptyValues";
import { BookingContext } from "@/context/BookingContext";
import { Icon } from "@/components/Stateless/Icon";
import { Button } from "@/components/ui/Button";
import { useHistory } from "@/hooks/useHistory";
import { Input } from "./Components/Input";
import { GolfCart } from "./GolfCart";
import toast from "react-hot-toast";
import Link from "next/link";
import { Car } from "./Car";
import { ATV } from "./Atv";

export function Form({ slug }) {

  const [isLoading, setLoading] = useState(false)

  const { data, updateData, reset } = useContext(BookingContext);

  const { previousRoute, pathname } = useHistory();

  useEffect(() => {
   if (previousRoute.startsWith("/Rentals")) {
     return reset()
   } 
  }, [pathname]);

  const dynamicForm = () => {
    switch (slug) {
      case "ATV":
        return <ATV data={data} updateData={updateData} />;
      case "Golf cart":
        return <GolfCart data={data} updateData={updateData} />;
      case "Car":
        return <Car data={data} updateData={updateData} />;
      default:
        <></>;
    }
  };

  function WpMessage() {
    
    const data = {

    }

    const bookingMessage = (() => {


      switch (slug) {
        case "ATV":
          return `Pick up: ${data?.pickUp}%0ADrop off: ${data?.dropOff}`;
        case "Golf cart":
          return `Passenger capacity: ${data?.seats}%0APick up: ${data?.pickUp}%0ADrop off: ${data?.dropOff}`;
        case "Car":
          return `Pick up: ${data?.pickUp}%0ADrop off: ${data?.dropOff} %0APick up location: ${data?.pickUpLocation} %0ADrop Off location: ${data?.dropOffLocation}`;
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
      e.preventDefault()
      setLoading(true)

      const res = await fetch("/sendRentalEmail", {
        method:"POST",
        body: JSON.stringify(filterEmptyValues([]))
       })
       
       if (!res.ok) {
        throw new Error(res.statusText);
       }

       const jsonData = await res.json()

       toast.success(jsonData.message);

    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false)
      reset()
     }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">
          Full Name
        </label>
        <Input required iconName="MdPersonOutline" placeholder="Full Name" value={data.name} setValue={value => updateData({ name: value })} />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">
          Email
        </label>
        <Input required type="email" iconName="MdOutlineMail" placeholder="Example@domain.com" value={data.email} setValue={value => updateData({ email: value })} />
      </div>

      <div className="relative flex flex-col gap-2 w-full">
        <label className="text-sm-medium">
          Phone
        </label>
        <Input iconName="MdOutlinePhone" type="tel" placeholder="+1 (207) 123 4567" value={data.phone} setValue={value => updateData({ phone: value })} />
      </div>
      
      {dynamicForm()}

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm-medium">
          Your Message
        </label>
        <textarea
          type="text"
          placeholder="Leave us a message..."
          className="max-h-40 min-h-20 p-4 border border-border rounded-lg outline-none"
          value={data.message} onChange={value => updateData({ message: value })}
        />
      </div>

      <div className="text-sm-medium flex items-center gap-2 text-text">
        <input required type="checkbox" className="w-3.5 h-3.5" value={data.isAccepted} onChange={e => updateData({ isAccepted: e.target.checked })} />
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

      <div className="flex items-center justify-between pt-6 border-t border-border mt-3">
        <Button radius="smooth" loading={isLoading} className="min-w-[120px]">Book Now</Button>
        <div className="flex items-center gap-3">
          <span className="text-md-medium text-text">OR</span>
          <Button as={Link} href={`https://wa.me/50686012266?text=Hello Nosara Booking Center.%0A%0AThis is my information to book a ${slug}. %0A%0A${WpMessage()}`} target="_blank" rel="noopener noreferrer" isIconOnly="lg" className="hover:-translate-y-1" >
            <Icon name="MdWhatsapp" className="size-7" />
          </Button>
        </div>
      </div>

    </form>
  );
}
