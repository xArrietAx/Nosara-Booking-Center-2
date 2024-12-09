import { createContext, useContext, useState } from "react";

const TabsContext = createContext();

const Tabs = ({ defaultValue, children, className, as = "div" }) => {

  const Tag = as

  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <Tag className={className}>{children}</Tag>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className, as = "ul" }) => {

  const Tag = as

  return <Tag className={`flex ${className}`}>{children}</Tag>;
};

const TabsTrigger = ({ value, children, className, as = "button" }) => {

    const Trigger = as

    const { activeTab, setActiveTab } = useContext(TabsContext);
  
    const isActive = activeTab === value;

    return (
      <Trigger onClick={() => setActiveTab(value)} className={className} >
        {typeof children === "function" ? children(isActive) : children}
      </Trigger>
    );
  };
  

const TabsContent = ({ value, children, className }) => {
  const { activeTab } = useContext(TabsContext);

  return activeTab === value ? (
    <>{children}</>
  ) : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
