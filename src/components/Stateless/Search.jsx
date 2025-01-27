"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HiOutlineSearch, MdCalendarMonth } from "@/icons/index";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Icon } from "../Stateless/Icon";
import Link from "next/link";

// Función para obtener valores anidados
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc && acc[key], obj);
};

export const Search = ({ 
  data = [], 
  fields = [], 
  placeholder = "Search", 
  className = "", 
  inputClassName = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Crear un timer para el debounce
    const timer = setTimeout(() => {
      if (!searchTerm) {
        setFilteredData([]); // Si no hay término, reiniciar los datos
        return;
      }

      // Filtrar datos basados en los campos especificados
      const results = data.filter(item =>
        fields.some(field =>
          String(getNestedValue(item, field) || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );

      setFilteredData(results);
    }, 300); // Ajusta el delay según tus necesidades

    // Limpiar el timer cuando cambie el término de búsqueda
    return () => clearTimeout(timer);
  }, [searchTerm, data, fields]);

  return (
    <Popover className={`w-full h-16 border border-border rounded-[10px] bg-secondary ${className}`}>
      {/* Input de búsqueda */}
      <PopoverTrigger className="w-full relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full h-full px-5 outline-none bg-transparent ${inputClassName}`}
          aria-label="Search"
        />
        <HiOutlineSearch className="absolute top-1/2 right-5 -translate-y-1/2 size-6" />
      </PopoverTrigger>
      
      {/* Renderizado de resultados */}
      <PopoverContent classNameWrapper="w-full mt-1" className="max-h-80 overflow-hidden overflow-y-auto" open={filteredData.length > 0}>
        <ul>
          {filteredData.map((item, index) =>
            <li key={index}>
              <Link href={item.slug ? `Blog/${item?.slug}` : item.url} className="flex gap-3 h-full p-2 rounded transition-colors duration-300 cursor-pointer hover:bg-secondary">
              {
                item?.metadata?.image ? <div className="flex-none w-14 h-14 rounded overflow-hidden">
                <Image src={item.metadata.image} alt="" width={200} height={200} className="w-full h-full object-cover" />
              </div> : null 
              }
              <div className="space-y-2">
                <span className="text-sm-bold line-clamp-2">{item?.metadata?.title || item?.name }</span>
                <div className="text-sm-medium flex items-center gap-1 text-text">
                  <Icon name={item?.icon || "MdCalendarMonth" } />
                  <span>{item?.metadata?.date || item.count + " " + item?.label }</span>
                </div>
              </div>
            </Link>
            </li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
