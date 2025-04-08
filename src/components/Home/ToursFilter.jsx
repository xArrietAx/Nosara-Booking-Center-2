"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import constants from "@/config/constants.json";
import { Button } from "../ui/Button";

export function ToursFilter() {

  const { createQueryString } = useCreateQueryString();

  const handleQuery = (key, value, close) => {
    createQueryString(key, value);
    close()
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
            Activities <i className="icon-[ion--chevron-down]" /> 
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-36 mt-1">
          {({ close }) => (
            <ul>
              {constants.toursFilter.activities.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 rounded-sm text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("category", item, close)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("category", item, close)
                  }
                >
                  {item ? item :"None"}
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
            Location <i className="icon-[ion--chevron-down]" />  
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-36 mt-1">
          {({ close }) => (
            <ul>
              {constants.toursFilter.locations.map((item) => (
                <li
                  key={item}
                  className="px-3 py-2 rounded-sm text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("location", item, close)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("location", item, close)
                  }
                >
                  {item ? item :"None"}
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
            Sort By <i className="icon-[ion--chevron-down]" /> 
          </Button>
        </PopoverTrigger>
        <PopoverContent classNameWrapper="min-[424px]:-left-8 min-[470px]:-left-0" className="min-w-36 mt-1">
          {({ close }) => (
            <ul>
              {constants.toursFilter.sortOptions.map((item) => (
                <li
                  key={item.value}
                  className="px-3 py-2 rounded-sm text-start whitespace-nowrap transition-colors duration-300 cursor-pointer hover:bg-secondary"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleQuery("sortBy", item.value, close)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuery("sortBy", item.value, close)
                  }
                >
                  {item.label ? item.label : "None"}
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}