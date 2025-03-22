"use client";

import { cloneElement, Children, createContext, useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

const AccordionContext = createContext();

const Accordion = ({ type = "single", as: Tag = "div", collapsible = false, children, className }) => {
  const [openItems, setOpenItems] = useState([]);

  useEffect(() => {
    const defaultOpen = Children.map(children, (child) => {
      if (child.props.open) {
        return child.props.value;
      }
      return null;
    }).filter(Boolean);

    setOpenItems(type === "single" ? [defaultOpen[0]] : defaultOpen);
  }, [children, type]);

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

const AccordionItem = ({ value, as: Tag = "div", open = false, children, className }) => {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <Tag className={className}>
      {Children.map(children, (child) => {
        if (child.type === AccordionTrigger) {
          return cloneElement(child, { isOpen, onClick: () => toggleItem(value) });
        }
        if (child.type === AccordionContent) {
          return cloneElement(child, { isOpen });
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