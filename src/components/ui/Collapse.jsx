"use client";

import React, { createContext, useContext, useState } from "react";
import { HiChevronDown } from "@/icons/index";
import { motion } from "framer-motion";

const CollapseContext = createContext();

const Collapse = ({ type = "single", collapsible = false, children, className }) => {

  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (value) => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(value) ? (collapsible ? [] : prev) : [value];
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
    <CollapseContext.Provider value={{ openItems, toggleItem }}>
      <div className={className}>{children}</div>
    </CollapseContext.Provider>
  );
};

const CollapseItem = ({ value, children }) => {

  const { openItems, toggleItem } = useContext(CollapseContext);

  const isOpen = openItems.includes(value);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (child.type === CollapseTrigger) {
          return React.cloneElement(child, { isOpen, onClick: () => toggleItem(value) });
        }
        if (child.type === CollapseContent) {
          return React.cloneElement(child, { isOpen });
        }
        return child;
      })}
    </>
  );
};

const CollapseTrigger = ({ children, isOpen, onClick, className, classNameIcon, as = "button" }) => {

  const Trigger = as

  return <Trigger onClick={onClick} className={className} style={{display:"flex", alignItems:"center", justifyContent:"space-between"}} >
    {children} <HiChevronDown className={`size-5 transition duration-300 ${isOpen ? "rotate-180" : null } ${classNameIcon}`} />
  </Trigger>
};

const CollapseContent = ({ children, isOpen }) => (
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
    {children}
  </motion.div>
);

export { Collapse, CollapseItem, CollapseTrigger, CollapseContent };