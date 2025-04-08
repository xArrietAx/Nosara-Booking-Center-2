import { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

const AccordionContext = createContext();

export function Accordion({ type = "single", defaultOpen = [], children, className = "" }) {
  const [openIndexes, setOpenIndexes] = useState(new Set(defaultOpen));

  const toggleItem = (value) => {
    setOpenIndexes((prev) => {
      let newSet = new Set(prev);
      if (type === "multiple") {
        newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      } else {
        newSet = newSet.has(value) ? new Set() : new Set([value]);
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openIndexes, toggleItem }}>
      <div className={className}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, children, className }) {
  const { openIndexes, toggleItem } = useContext(AccordionContext);
  const isOpen = openIndexes.has(value);

  return (
    <div className={className}>
      {/* Pasamos el value al contexto de cada AccordionItem */}
      <AccordionItemContext.Provider value={{ value, isOpen, toggleItem }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
}

// Contexto específico para AccordionItem
const AccordionItemContext = createContext();

export function AccordionTrigger({ children, className }) {
  const { value, toggleItem, isOpen } = useContext(AccordionItemContext);

  return (
    <button
      className={className}
      onClick={() => toggleItem(value)}
    >
      {typeof children === "function" ? children(isOpen) : children }
    </button>
  );
}

export function AccordionContent({ children, className }) {
  const { isOpen } = useContext(AccordionItemContext);

  return (
    <motion.div
      initial={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
}
