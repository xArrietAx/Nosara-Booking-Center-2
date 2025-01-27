"use client"

import React, { useState, createContext, useContext } from "react";
import { Button } from "./Button";

const TabsContext = createContext();

const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const renderContent = () => {
    if (typeof children === "function") {
      return children({ activeTab, setActiveTab });
    }
    return children;
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{renderContent()}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

const TabsTrigger = ({ value, children, onClick, variant, size, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = activeTab === value;

  return (
    <Button className={className} onClick={() => {setActiveTab(value), onClick()}} size={size} variant={isActive ? variant : "ghost"}>
       {children}
     </Button>
  );
};

const TabsContent = ({ value, children }) => {

  const { activeTab } = useContext(TabsContext);

  if (value !== activeTab) return null;

  return <>{children}</>;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
