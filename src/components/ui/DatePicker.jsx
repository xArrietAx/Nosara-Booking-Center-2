"use client";

import { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isToday,
  isSameDay,
  addDays,
  subDays,
  isBefore,
  startOfDay,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DatePicker({
  selected,
  onChange,
  placeholder = "Select a date",
  className,
  classNameWrapper,
  leftSide,
  rightSide,
  required = true
}) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
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
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        handleClose()
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose()
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const prevMonthDays = Array.from({ length: getDay(firstDayOfMonth) }).map(
    (_, index) => subDays(firstDayOfMonth, getDay(firstDayOfMonth) - index)
  );

  const totalDays = prevMonthDays.length + daysInMonth.length;
  const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);

  const nextMonthDays = Array.from({ length: remainingDays }).map((_, index) =>
    addDays(lastDayOfMonth, index + 1)
  );

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  return (
    <div className="relative">
      <div
        className={`relative cursor-pointer ${classNameWrapper}`}
        onClick={handleOpen}
        ref={inputRef}
      >
        {leftSide}
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          className={`max-w-24 ${className}`}
          value={selected ? format(selected, "MM/dd/yyyy") : ""}
          onChange={() => {}}
          inputMode="none"
        />
        <div className="absolute left-5 z-50 w-48 h-10" />
        {rightSide}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isOpen ? 1 : 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-primary/50 md:hidden" onClick={handleClose} />
            <div className="fixed top-[50%] left-[50%] z-50 min-w-[18.5rem] translate-x-[-50%] translate-y-[-50%] md:absolute md:top-full md:left-0 md:p-0 md:mt-1" ref={datePickerRef} >
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-3 border border-border rounded-lg bg-white shadow-2xl" >
                <div className="flex justify-between mt-2 mb-[18px]">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentMonth((prev) => subMonths(prev, 1))
                    }
                    className="flex items-center justify-center w-6 h-6 rounded-sm transition-colors duration-300 disabled:opacity-20 hover:bg-secondary"
                    disabled={isSameMonth(today, currentMonth)}
                  >
                    <i className="icon-[ion--chevron-back]" />
                  </button>
                  <span className="font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentMonth((prev) => addMonths(prev, 1))
                    }
                    className="flex items-center justify-center w-6 h-6 rounded-sm transition-colors duration-300 hover:bg-secondary"
                  >
                    <i className="icon-[ion--chevron-forward]" />
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center text-text text-sm">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="w-10 font-semibold text-center">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 text-center mt-1">
                  {allDays.map((day) => {
                    const today = new Date();
                    const isDisabled = isBefore(day, startOfDay(today));
                    const isOutsideMonth = !isSameMonth(day, currentMonth);
                    const isSelected = isSameDay(day, selected);
                    const isCurrentDay = isToday(day);

                    return (
                      <button
                        type="button"
                        key={day.toString()}
                        onClick={() => {
                          if (!isDisabled) {     
                            onChange(day);
                            handleClose()
                            if (isOutsideMonth) {
                              setCurrentMonth(startOfMonth(day));
                            }
                          }
                        }}
                        disabled={isDisabled}
                        className={`flex flex-1 items-center justify-center w-8 h-8 rounded-sm m-1 font-medium text-sm cursor-pointer transition-colors duration-300
                        ${
                          isSelected
                            ? "bg-primary text-white hover:bg-primary!"
                            : ""
                        }
                        ${
                          isDisabled
                            ? "opacity-50 !cursor-not-allowed"
                            : "hover:bg-secondary"
                        }
                        ${isOutsideMonth ? "opacity-50" : ""}
                        ${isCurrentDay ? "border border-border " : ""}`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
