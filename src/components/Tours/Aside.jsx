"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export function Aside({ countsData: { location, activity, duration } }) {
  const { createQueryString, searchParams } = useCreateQueryString();

  const debounceRef = useRef(null);

  const currentActivity = searchParams.get("activity") ? searchParams.get("activity").split(",") : [];
  const currentDuration = searchParams.get("duration") ? searchParams.get("duration").split(",") : [];
  const currentLocation = searchParams.get("location") ? searchParams.get("location").split(",") : [];
  const priceRangeParam = searchParams.get("priceRange") ? searchParams.get("priceRange") : "";

  const [range, setRange] = useState({ min: 520, max: 1000 });

  useEffect(() => {
    if (!priceRangeParam) {
      setRange({ min: 520, max: 1000 });
    }

    if (priceRangeParam) {
      const [min, max] = priceRangeParam.split("-").map(Number);
      setRange({ min, max });
    }
  }, [searchParams]);

  const handleRangeChange = (e) => {
    const { name, value } = e.target;

    setRange((prevRange) => {
      const newRange = { ...prevRange, [name]: Number(value) };

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        createQueryString(
          { priceRange: `${newRange.min}-${newRange.max}`, page: "" },
          null,
          null,
          "tours"
        );
      }, 400);

      return newRange;
    });
  };

  function handleQuery(key, value) {
    if (key === "type") {
      const currentType = searchParams.get("type");
      const newType = currentType === value ? "" : value;
      createQueryString({ [key]: newType, page: "" }, null, null, "tours");
    } else {
      const currentValues = searchParams.get(key)
        ? searchParams.get(key).split(",")
        : [];
      const updatedValues = currentValues.includes(String(value))
        ? currentValues.filter((v) => v !== String(value))
        : [...currentValues, String(value)];

      createQueryString(
        { [key]: updatedValues.join(","), page: "" },
        null,
        null,
        "tours"
      );
    }
  }

  return (
    <aside className="lg:w-[30%] xl:w-[25%]">
      <div className="space-y-8 p-7 border border-border rounded-2xl">
        <Accordion type="multiple" defaultOpen={["price", "activity", "location", "duration"]} collapsible className="space-y-12" >
          <AccordionItem value="price" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    Filter Price
                    <i
                      className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                        !isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                );
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-8 mt-5">
                <div className="space-y-5">
                <input
  type="range"
  name="min"
  min="0"
  max={range.max - 1}
  value={range.min}
  onChange={handleRangeChange}
  className="w-full"
/>
<input
  type="range"
  name="max"
  min={range.min + 1}
  max="2000"
  value={range.max}
  onChange={handleRangeChange}
  className="w-full"
/>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm-medium">
                    ${range.min} - ${range.max}
                  </p>
                  <Button
                    size="xs"
                    radius="smooth"
                    variant="ghost"
                    onClick={() => {
                      priceRangeParam
                        ? createQueryString(
                            { priceRange: "" },
                            null,
                            null,
                            "tours"
                          )
                        : null;
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="activity" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    By Activities
                    <i
                      className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                        !isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                );
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {activity.map((item) => {
                  const isChecked = currentActivity.includes(item.activity);
                  return (
                    <div className="flex items-center gap-3" key={item.activity}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("activity", item.activity)}
                      />
                      <label className="text-sm-medium">{item.activity}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="location" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                   By Location
                    <i
                      className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                        !isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                );
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {location.map((item) => {
                  const isChecked = currentLocation.includes(item.location);
                  return (
                    <div className="flex items-center gap-3" key={item.location}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("location", item.location)}
                      />
                      <label className="text-sm-medium">{item.location}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="duration" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    By Duration
                    <i
                      className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                        !isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                );
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {duration.map((item) => {
                  const isChecked = currentDuration.includes(String(item.value));
                  return (
                    <div
                      className="flex items-center gap-3"
                      key={item.duration}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("duration", item.value)}
                      />
                      <label className="text-sm-medium">{item.duration}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </aside>
  );
}