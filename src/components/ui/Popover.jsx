"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopoverContext = createContext();

const Popover = ({ children, className, hover = false, clickOutside = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!clickOutside) return;

    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickOutside]);

  const handleMouseEnter = () => {
    if (hover) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (hover) setIsOpen(false);
  };

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={`relative flex ${className}`}
        ref={popoverRef}
        onMouseEnter={hover ? handleMouseEnter : undefined}
        onMouseLeave={hover ? handleMouseLeave : undefined}
      >
          {children}
      </div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children, className, as = "button", ...props }) => {
  const Trigger = as;

  const { setIsOpen } = useContext(PopoverContext);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Trigger className={className} onClick={handleClick} {...props}>
      {children}
    </Trigger>
  );
};

const PopoverContent = ({ children, className, classNameWrapper }) => {
  const { isOpen } = useContext(PopoverContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`absolute top-full z-[100] ${classNameWrapper}`}>
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`p-3 border border-border rounded-lg bg-white shadow-2xl ${className}`}
        >
          {children}
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { Popover, PopoverTrigger, PopoverContent };
