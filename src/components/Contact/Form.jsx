"use client"

import { HiArrowNarrowLeft, MdOutlineMail, MdOutlinePhone, MdPersonOutline } from "@/icons/index";
import { Button } from "../ui/Button";
import Link from "next/link";

export function Form() {

  function Submit(e) {
    e.preventDefault();
  }

  return <form onSubmit={Submit} className="flex flex-col gap-5 mt-8">
    
    <div className="flex flex-col gap-5 lg:flex-row">
    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="name" className="text-sm-medium">Full Name</label>
      <MdPersonOutline className="absolute top-[49px] left-5 text-text size-5" />
      <input id="name" type="text" placeholder="Full Name" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>
    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="email" className="text-sm-medium">Email</label>
      <MdOutlineMail className="absolute top-[49px] left-5 text-text size-5" />
      <input id="email" type="text" placeholder="email@domain.com" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>
    </div>

    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="phone" className="text-sm-medium">Phone</label>
      <MdOutlinePhone className="absolute top-[49px] left-5 text-text size-5" />
      <input id="phone" type="text" placeholder="Phone Number" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>

    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="message" className="text-sm-medium">Your Message</label>
      <textarea id="message" type="text" placeholder="Leave us a message..." className="max-h-40 min-h-20 p-4 border border-border rounded-lg outline-none" />
    </div>

    <div className="text-sm-medium flex items-center gap-2 text-text">
      <input id="accept" type="checkbox" className="w-3.5 h-3.5" />
      <label htmlFor="accept">Agree to our <Link href="/" className="link font-bold text-black">Terms of service</Link> and <Link href="/" className="link font-bold text-black">Privacy Policy</Link></label>
    </div>

    <Button radius="smooth" size="lg" hover="outline" >Send Message <HiArrowNarrowLeft className="size-6 rotate-180" /></Button>

  </form>;
}
