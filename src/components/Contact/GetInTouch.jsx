"use client"

import content from "@/content/contact.json";
import { Form } from "./Form";
import Image from "next/image";

export function GetInTouch() {
  return (
    <section className="section-space relative lg:border-t lg:border-border lg:py-24">
          
          <div className="w-full h-full mb-9 lg:absolute lg:top-0 lg:right-0 lg:max-w-[50%]">
          <Image className="w-full h-full object-cover" src={content.getInTouch.img} alt="" width={1200} height={1200} priority />          
          </div>

      <div className="container">
          <div className="w-full lg:relative lg:z-10 lg:p-10 lg:border lg:border-border lg:rounded-3xl lg:bg-white lg:shadow-2xl lg:w-[70%] xl:w-[60%]">
            <h2 className="heading-2">{content.getInTouch.title}</h2>
            <Form />
          </div>
      </div>

    </section>
  );
}

