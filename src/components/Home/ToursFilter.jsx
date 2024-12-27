"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { HiChevronDown } from "@/icons/index";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";

export function ToursFilter() {
  const router = useRouter();

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "None") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Popover clickOutside>
        <PopoverTrigger>
          <Button
            as="span"
            size="sm"
            variant="secondary"
            hover="outline"
            className="font-medium"
          >
            Categories <HiChevronDown className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-1">
          {
            ({ setIsOpen }) => {
                return <ul>
                {["None","ATV", "Sea Adventure", "Canopy"].map((item) => {
                  return (
                    <li
                      key={item}
                      className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                      onClick={() => {
                        {updateQuery("category", item), setIsOpen(false)}
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            }
          }
        </PopoverContent>
      </Popover>

      <Popover clickOutside>
        <PopoverTrigger>
          <Button
            as="span"
            size="sm"
            variant="secondary"
            hover="outline"
            className="font-medium"
          >
            Location <HiChevronDown className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-1">
          { ({ setIsOpen }) => {
            return <ul>
            {["None", "Garza", "Nosara", "Camaronal"].map((item) => {
              return (
                <li
                  key={item}
                  className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  onClick={() => {
                    {updateQuery("location", item), setIsOpen(false)}
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          } }
        </PopoverContent>
      </Popover>

      <Popover clickOutside>
        <PopoverTrigger>
          <Button
            as="span"
            size="sm"
            variant="secondary"
            hover="outline"
            className="font-medium"
          >
            Sort By <HiChevronDown className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mt-1">
          {
            ({ setIsOpen }) => {
                return <ul>
                {[
                  { label: "None", value: "" },
                  { label: "Price: Low to High", value: "priceAsc" },
                  { label: "Price: High to Low", value: "priceDesc" }
                ].map((item) => {
                  return (
                    <li
                      key={item.value}
                      className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                      onClick={() => {
                        {updateQuery("sortBy", item.value), setIsOpen(false)}
                      }}
                    >
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            }
          }
        </PopoverContent>
      </Popover>
    </div>
  );
}
