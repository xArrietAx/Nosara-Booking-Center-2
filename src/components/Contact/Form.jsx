"use client"

import { HiArrowNarrowLeft, MdOutlineMail, MdPersonOutline, LiaThumbtackSolid } from "@/icons/index";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export function Form() {

  const [isLoading, setLoading] = useState(false)

  async function Submit(e) {
    try {
      e.preventDefault()

      setLoading(true)

      const formData = new FormData(e.target) 

      const data = {
        isAccepted: formData.get("isAccepted"),
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")   
      }

       const res = await fetch("/sendContactEmail", {
        method:"POST",
        body:JSON.stringify(data)
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
      e.target.reset()
     }
  }

  return <form onSubmit={Submit} className="flex flex-col gap-5 mt-8">
    
    <div className="flex flex-col gap-5 lg:flex-row">
    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="name" className="text-sm-medium">Full Name</label>
      <MdPersonOutline className="absolute top-[49px] left-5 text-text size-5" />
      <input required name="name" id="name" type="text" placeholder="Full Name" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>
    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="email" className="text-sm-medium">Email</label>
      <MdOutlineMail className="absolute top-[49px] left-5 text-text size-5" />
      <input required name="email" id="email" type="email" placeholder="Example@domain.com" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>
    </div>

    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="subject" className="text-sm-medium">Subject</label>
      <LiaThumbtackSolid className="absolute top-[49px] left-5 text-text size-5" />
      <input required name="subject" id="subject" type="tel" placeholder="Inquiry about" className="p-4 pl-12 border border-border rounded-lg outline-none" />
    </div>

    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="message" className="text-sm-medium">Your Message</label>
      <textarea required name="message" id="message" type="text" placeholder="Leave us a message..." className="max-h-40 min-h-20 p-4 border border-border rounded-lg outline-none" />
    </div>

    <div className="text-sm-medium flex items-center gap-2 text-text">
      <input required name="isAccepted" id="isAccepted" type="checkbox" className="w-3.5 h-3.5" />
      <label htmlFor="isAccepted">Agree to our <Link href="/Terms-conditions" className="link font-bold text-black">Terms of service</Link> and <Link href="/Privacy-policy" className="link font-bold text-black">Privacy Policy</Link></label>
    </div> 

    <Button radius="smooth" size="lg" hover="outline" loading={isLoading} >Send Message <HiArrowNarrowLeft className="size-6 rotate-180" /></Button>

  </form>;
}
