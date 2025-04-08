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

export function Aside({ countsData: { type, propertyType, location, amenities } }) {
  const { createQueryString, searchParams } = useCreateQueryString();

  const debounceRef = useRef(null);

  const currentType = searchParams.get("type") ? searchParams.get("type").split(",") : "";
  const currentPropertyType = searchParams.get("property_type") ? searchParams.get("property_type").split(",") : [];
  const currentLocation = searchParams.get("location") ? searchParams.get("location") : "";
  const currentAmenities = searchParams.get("amenities") ? searchParams.get("amenities").split(",") : [];
  const priceRangeParam = searchParams.get("priceRange") ? searchParams.get("priceRange") : "";

  const [range, setRange] = useState({ min: 1300, max: 2500 });

  useEffect(() => {
    if (!priceRangeParam) {
      setRange({ min: 1300, max: 2500 });
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
          "houses"
        );
      }, 400);

      return newRange;
    });
  };

  function handleQuery(key, value) {

    if (key === "location" || key === "type") {
      const currentValue = searchParams.get(key);
      const newValue = currentValue === value ? "" : value;
      createQueryString({ [key]: newValue, page: "" }, null, null, "houses");
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
        "houses"
      );
    }

  }

  return (
    <aside className="lg:w-[30%] xl:w-[25%]">
      <div className="space-y-8 p-7 border border-border rounded-2xl">
        <Accordion type="multiple" defaultOpen={["price", "type", "propertyType", "location", "amenities"]} collapsible className="space-y-12" >
          <AccordionItem value="price" className="pb-8 border-b border-border">
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
  max="5000"
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
                            "houses"
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

          <AccordionItem value="type" className="pb-8 border-b border-border">
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    Type
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
                {type.map((item) => {
                  const isChecked = currentType.includes(item.type);
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
    
          <AccordionItem value="propertyType" className="pb-8 border-b border-border">
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    Properties Type
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
                {propertyType.map((item) => {
                  const isChecked = currentPropertyType.includes(item.propertyType);
                  return (
                    <div className="flex items-center gap-3" key={item.propertyType}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("property_type", item.propertyType)}
                      />
                      <label className="text-sm-medium">{item.propertyType}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="amenities" className="pb-8 border-b border-border">
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    Amenities
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
                {amenities.map((item) => {
                  const isChecked = currentAmenities.includes(item.amenity);
                  return (
                    <div className="flex items-center gap-3" key={item.amenity}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleQuery("amenities", item.amenity)}
                      />
                      <label className="text-sm-medium capitalize">{item.amenity}</label>
                      <div className="flex items-center justify-center w-7 h-7 p-1 rounded ml-auto text-xs-medium bg-secondary">
                        {item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="location"
            className="pb-8 border-b border-border"
          >
            <AccordionTrigger className="flex items-center justify-between w-full text-lg-bold">
              {(isOpen) => {
                return (
                  <>
                    Booking Location
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
                  const isChecked = currentLocation === item.location;   
                  return (
                    <div
                      className="flex items-center gap-3"
                      key={item.location}
                    >
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
        </Accordion>
      </div>
    </aside>
  );
}