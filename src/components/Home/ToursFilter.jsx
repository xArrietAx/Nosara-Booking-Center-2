"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import constants from "@/config/constants.json";
import { HiChevronDown } from "@/icons/index";
import { Button } from "../ui/Button";

export function ToursFilter() {

  const updateQuery = useUpdateQuery();

  const handleQuery = (key, value, setIsOpen) => {
    updateQuery(key, value);
    setIsOpen(false)
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
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
        <PopoverContent className="min-w-36 mt-1">
          {({ setIsOpen }) => (
            <ul>
              {constants.toursFilter.categories.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("category", item, setIsOpen)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("category", item, setIsOpen)
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
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
        <PopoverContent className="min-w-36 mt-1">
          {({ setIsOpen }) => (
            <ul>
              {constants.toursFilter.locations.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("location", item, setIsOpen)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("location", item, setIsOpen)
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
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
        <PopoverContent classNameWrapper="min-[424px]:-left-8 min-[470px]:-left-0" className="min-w-36 mt-1">
          {({ setIsOpen }) => (
            <ul>
              {constants.toursFilter.sortOptions.map((item) => (
                <li
                  key={item.value}
                  className="px-3 py-2 rounded text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("sortBy", item.value, setIsOpen)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("sortBy", item.value, setIsOpen)
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}