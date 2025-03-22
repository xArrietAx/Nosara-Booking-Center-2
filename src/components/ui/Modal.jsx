"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

const ModalContext = createContext();

const Modal = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    document.documentElement.style.overflow = "auto";
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      <div className={className}>
      {children}
      </div>
    </ModalContext.Provider>
  );
};

const ModalContent = ({ children, className }) => {
  const { isOpen, open, close } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen px-2 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <motion.div
            className={`container w-full max-w-4xl rounded-md bg-white p-6 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof children === "function" ? children({ isOpen, open, close }) : children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader = ({ children, className, classNameTitle }) => {
  const { close } = useContext(ModalContext);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={classNameTitle}>{children}</span>
      <Button isIconOnly radius="smooth" variant="secondary" onClick={close}>
      <i className="icon-[heroicons-outline--x] size-7" />
      </Button>
    </div>
  );
};

const ModalFooter = ({ children, className }) => {
  return (
    <div className={`border-t pt-4 mt-4 flex justify-end gap-4 ${className}`}>
      {children}
    </div>
  );
};

const ModalTrigger = ({ as = "button", children, className, ...props }) => {
  
  const Trigger = as;

  const { open } = useContext(ModalContext);

  return (
    <Trigger className={className} onClick={open} {...props}>
      {children}
    </Trigger>
  );
};

export { Modal, ModalContent, ModalHeader, ModalFooter, ModalTrigger };
