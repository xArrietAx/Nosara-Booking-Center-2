"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import useCreateQueryString from "@/hooks/useCreateQueryString";
import { Button } from "../ui/Button";

const sort = ["name", "price", "duration"];
const show = ["5", "10", "15"];

export function Header({ page, limit, count, sortBy }) {
  const start = count === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, count);

  const { createQueryString } = useCreateQueryString();

  function handleQuery(key, value, close) {
    const updates = { [key]: value };
    if (key === "limit") {
      if (parseInt(value) === limit) return;
      updates["page"] = null;
    }
    createQueryString(updates, null, "shuttles");
    close();
  }

  const deleteQueries = () => {
    createQueryString(null);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-5 pb-5 border-b border-border md:justify-between">
      <div className="flex items-center gap-2 text-text">
        <i className="icon-[la--shuttle-van] size-5" />
        <p className="text-sm-bold">
          {start} - {end} of {count} shuttles found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          radius="smooth"
          className="text-sm"
          onClick={deleteQueries}
        >
          Clear Filters
        </Button>
        <div className="flex items-center p-[7px] border border-border rounded">
          <span className="hidden mx-2 text-xs-medium text-text xs:inline">
            Show
          </span>
          <Popover clickOutside>
            <PopoverTrigger className="flex items-center gap-1">
              {limit} <i className="icon-[ion--chevron-down]" />
            </PopoverTrigger>
            <PopoverContent className="min-w-fit rounded-none! p-0!">
              {({ close }) => (
                <ul>
                  {show.map((item) => {
                    return (
                      <li
                        key={item}
                        className="py-1 pr-4 pl-2 transition-colors duration-300 cursor-pointer hover:bg-secondary"
                        onClick={() => handleQuery("limit", item, close)}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center p-[7px] border border-border rounded">
          <span className="hidden mx-2 text-xs-medium text-text xs:inline">
            Sort by:
          </span>
          <Popover clickOutside>
            <PopoverTrigger className="flex items-center gap-1 capitalize">
              {sortBy} <i className="icon-[ion--chevron-down]" />
            </PopoverTrigger>
            <PopoverContent className="min-w-fit rounded-none! p-0!">
              {({ close }) => (
                <ul>
                  {sort.map((item) => {
                    return (
                      <li
                        key={item}
                        className="py-1 pr-4 pl-2 transition-colors duration-300 cursor-pointer capitalize hover:bg-secondary"
                        onClick={() => handleQuery("sortBy", item, close)}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
