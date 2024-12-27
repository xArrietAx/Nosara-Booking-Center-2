"use client";

import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/Stateless/Icon";

const AccordionContext = createContext();

const Accordion = ({ type = "single", as: Tag = "div", collapsible = false, children, className }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    setOpenItems((prev) => {
      if (type === "single") {
        if (prev.includes(value)) {
          return collapsible ? [] : prev;
        }
        return [value];
      }
      if (type === "multiple") {
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
      }
      return prev;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <Tag className={className}>{children}</Tag>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ value, as: Tag = "div", children, className }) => {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <Tag className={className}>
      {React.Children.map(children, (child) => {
        if (child.type === AccordionTrigger) {
          return React.cloneElement(child, { isOpen, onClick: () => toggleItem(value) });
        }
        if (child.type === AccordionContent) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </Tag>
  );
};

const AccordionTrigger = ({
  children,
  isOpen,
  onClick,
  className,
  icon,
  as = "button",
}) => {
  const Trigger = as;

  return (
    <Trigger onClick={onClick} className={`${className} flex items-center justify-between cursor-pointer`} >
      {typeof children === "function" ? children(isOpen) : children}
      {typeof icon === "function" ? icon(isOpen) : icon}
    </Trigger>
  );
};

const AccordionContent = ({ children, isOpen }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      overflow: "hidden",
      borderTop: "none",
    }}
  >
    {typeof children === "function" ? children(isOpen) : children}
  </motion.div>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
