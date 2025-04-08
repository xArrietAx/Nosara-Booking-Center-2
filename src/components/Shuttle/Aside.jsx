"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

export function Aside({ countsData: { type, duration, demand, distance } }) {

  const { createQueryString, searchParams } = useCreateQueryString();

  const debounceRef = useRef(null);

  const currentType = searchParams.get("type") ? searchParams.get("type") : "";
  const currentDuration = searchParams.get("duration") ? searchParams.get("duration").split(",") : [];
  const currentDemand = searchParams.get("demand") ? searchParams.get("demand").split(",") : [];
  const currentDistance = searchParams.get("distance") ? searchParams.get("distance").split(",") : [];
  const priceRangeParam = searchParams.get("priceRange") ? searchParams.get("priceRange") : ""

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
          null, null, "shuttles"
        );
      }, 400);

      return newRange;
    });
  };

  function handleQuery(key, value) {
    if (key === "type") {
      const currentType = searchParams.get("type");
      const newType = currentType === value ? "" : value;
      createQueryString({ [key]: newType, page: "" }, null, null,"shuttles");
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
        null,"shuttles"
      );
    }
  }

  return (
    <aside className="lg:w-[30%] xl:w-[25%]">
      <div className="space-y-8 p-7 border border-border rounded-2xl">
        <Accordion type="multiple" defaultOpen={["price","type","demand","duration","distance"]} collapsible className="space-y-12">
          <AccordionItem value="price" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold" >
              {(isOpen) => {
                return <>
                Filter Price
                <i className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${ !isOpen ?"rotate-180" : "" }`} />
                </>
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
                <Button size="xs" radius="smooth" variant="ghost" onClick={() => { priceRangeParam ? createQueryString({ "priceRange": "" }, null, null,"shuttles") : null }} >Reset</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="type" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
            {(isOpen) => {
                return <>
                By Type
                <i className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${ !isOpen ?"rotate-180" : "" }`} />
                </>
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {type.map((item) => {
                  const isChecked = currentType === item.type;
                  return (
                    <div className="flex items-center gap-3" key={item.type}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("type", item.type)}
                      />
                      <label className="text-sm-medium">{item.type}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="demand" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold" >
              {(isOpen) => {
                return <>
                By Demand
                <i
                  className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                    !isOpen ? "rotate-180" : ""
                  }`}
                />
                </>
              }}
              
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {demand.map((item) => {
                  const isChecked = currentDemand.includes(item.demand);
                  return (
                    <div className="flex items-center gap-3" key={item.demand}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("demand", item.demand)}
                      />
                      <label className="text-sm-medium">{item.demand}</label>
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
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold" >
            {(isOpen) => {
                return <>
                By Duration
                <i
                  className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                    !isOpen ? "rotate-180" : ""
                  }`}
                />
                </>
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {duration.map((item) => {
                  const isChecked = currentDuration.includes(
                    String(item.value)
                  );
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

          <AccordionItem value="distance" className="pb-8 border-b border-border" >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold" >
            {(isOpen) => {
                return <>
                By Distance
                <i
                  className={`icon-[ion--chevron-down] size-4 transition-transform duration-300 ${
                    !isOpen ? "rotate-180" : ""
                  }`}
                />
                </>
              }}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-5">
                {distance.map((item) => {
                  const isChecked = currentDistance.includes(
                    String(item.distance)
                  );

                  const distanceRanges = {
                    Short: "Short ( 0 - 30 km )",
                    Medium: "Medium ( 30 - 100 km )",
                    Long: "Long ( 100 - 200 km )",
                    "Very Long": "Very Long ( +200 km )",
                  };

                  return (
                    <div
                      className="flex items-center gap-3"
                      key={item.distance}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("distance", item.distance)}
                      />
                      <label className="text-sm-medium">
                        {distanceRanges[item.distance]}
                      </label>
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
