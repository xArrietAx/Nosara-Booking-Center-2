import { all } from "@/icons/index";
import React from "react";

export function Icon({ name, className = "" }) {

  const SelectedIcon = all[name]; 

  if (!SelectedIcon) {
    console.warn(`Icon "${name}" not found in the icon list.`);
    return null;
  }

  return <SelectedIcon className={className} />;
}
