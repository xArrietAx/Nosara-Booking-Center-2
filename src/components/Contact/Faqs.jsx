"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import content from "@/content/contact.json";
import { HiPlus } from "@/icons/index";
import { Heading } from "@/components/Stateless/Heading";

export function Faqs() {
  return (
    <section id="Faqs" className="pb-24 bg-no-repeat bg-left-bottom" style={{ backgroundImage: `url(${content.faqs["bg-img"]})` }}>
      <div className="container">
        <Heading
          as="h3"
          title={content.faqs.title}
          desc={content.faqs.desc}
          className="text-center"
          classNameTitle="heading-2"
        />

        <Accordion
          type="single"
          collapsible
          className="flex flex-col h-fit border border-border rounded-lg mt-16"
        >
          {content.faqs.faqs.map((item, i) => {
            return (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="px-5 py-8 border-b border-border last:border-0"
              >
                <AccordionTrigger
                  icon={(isOpen) => (
                    <HiPlus
                      className={`min-w-fit p-2 rounded-full bg-secondary size-9 transition-transform duration-300 ${
                        isOpen ? "rotate-[135deg]" : null
                      }`}
                    />
                  )}
                  className="gap-3 w-full"
                >
                  <div className="flex items-center gap-5">
                    <span className="heading-5 hidden sm:block">0{i + 1}</span>
                    <span className="text-xl-bold text-start">
                      {item.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-3 mr-8 font-medium text-text sm:ml-[50px]">
                    {item.desc}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
