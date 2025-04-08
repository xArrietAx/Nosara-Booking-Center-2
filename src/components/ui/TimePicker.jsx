"use client";

import { useState, useRef, useEffect } from "react";
import { format, setHours, setMinutes, getHours, getMinutes } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export function TimePicker({
  selected,
  onChange,
  placeholder = "Select a time",
  className,
  classNameWrapper,
  leftSide,
  rightSide,
  interval = 5, // Minutes interval
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAM, setIsAM] = useState(true);
  const timePickerRef = useRef(null);
  const inputRef = useRef(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
    if (window.innerWidth < 768) {
      document.documentElement.style.overflow = "hidden";
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 / interval }, (_, i) => i * interval);

  return (
    <div>
      <div
        className={`relative cursor-pointer ${classNameWrapper}`}
        onClick={handleOpen}
        ref={inputRef}
      >
        {leftSide}
        <input
          type="text"
          placeholder={placeholder}
          required
          className={`max-w-24 ${className}`}
          value={
            selected ? format(selected, "hh:mm") + (isAM ? " AM" : " PM") : ""
          }
          onChange={() => {}}
          inputMode="none"
        />
        <div className="absolute left-5 z-50 w-48 h-10" />
        {rightSide}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-primary/50 md:hidden"
              onClick={handleClose}
            />
            <div className="fixed top-0 left-0 z-[9999999] flex items-center justify-center w-screen h-screen md:relative md:w-72 md:h-0">
              <div
                className="absolute w-full max-w-64 px-5 md:left-0 md:top-full md:p-0 md:mt-1"
                ref={timePickerRef}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 border border-border rounded-lg bg-white shadow-2xl"
                >
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col max-h-48 px-2 overflow-y-auto">
                      {hours.map((hour) => (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          key={hour}
                          radius="smooth"
                          onClick={() => {
                            const adjustedHour = isAM ? hour : hour + 12;
                            onChange(
                              setHours(selected || new Date(), adjustedHour)
                            );
                          }}
                        >
                          {hour.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-col max-h-48 px-2 overflow-y-auto">
                      {minutes.map((minute) => (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          key={minute}
                          radius="smooth"
                          onClick={() =>
                            onChange(setMinutes(selected || new Date(), minute))
                          }
                        >
                          {minute.toString().padStart(2, "0")}
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-col">
                    <Button
  type="button"
  size="sm"
  radius="smooth"
  variant={isAM ? "primary" : "ghost"}
  onClick={() => {
    if (!isAM) {
      // Cambiar de PM a AM, restando 12 horas si es necesario
      onChange(setHours(selected || new Date(), getHours(selected) - 12));
    }
    setIsAM(true);
  }}
>
  AM
</Button>
<Button
  type="button"
  size="sm"
  radius="smooth"
  variant={!isAM ? "primary" : "ghost"}
  onClick={() => {
    if (isAM) {
      // Cambiar de AM a PM, sumando 12 horas si es necesario
      onChange(setHours(selected || new Date(), getHours(selected) + 12));
    }
    setIsAM(false);
  }}
>
  PM
</Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
