"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopoverContext = createContext();

export const Popover = ({ children, className, hover = false, clickOutside = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const open = () => {
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "auto";
  };

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
    <PopoverContext.Provider value={{ isOpen, setIsOpen, open, close }}>
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

export const PopoverTrigger = ({ children, className, as = "button", onClick, ...props }) => {
  const Trigger = as;

  const { setIsOpen, isOpen } = useContext(PopoverContext);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Trigger className={className} onClick={ onClick ? onClick : handleClick} {...props}>
      { typeof children === "function" ? children({ isOpen, setIsOpen }) : children }
    </Trigger>
  );
};

export const PopoverContent = ({ children, className, classNameWrapper, open: __open }) => {
  const { isOpen, setIsOpen, open, close } = useContext(PopoverContext);

  const isPopoverOpen = __open !== undefined ? __open : isOpen;

  return (
    <AnimatePresence>
      { isPopoverOpen && (
        <div className={`absolute top-full z-[100] ${classNameWrapper}`}>
          <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`p-3 border border-border rounded-lg bg-white shadow-2xl ${className}`}
        >
          { typeof children === "function" ? children({ isOpen, setIsOpen, open, close }) : children }
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};