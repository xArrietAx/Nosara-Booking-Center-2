"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import React, { createContext, useContext } from "react";
import { Button } from "./Button";

const PaginationContext = createContext();

const PaginationProvider = ({ children, initialPage = 1, total = 1, anchor }) => {

  const {createQueryString} = useCreateQueryString()
  
  const goToPage = (page) => {
    if (page >= 1 && page <= total) {
      createQueryString("page", page, null, anchor)
    }
  };

  return (
    <PaginationContext.Provider
      value={{
        initialPage,
        total,
        goToPage,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

const Pagination = ({ className, initialPage = 1, total = 1, showControls = true, anchor }) => {

  if (total === 1) {
    return null
  }

  return (
    <PaginationProvider initialPage={initialPage} total={total} anchor={anchor}>
      <div className={`flex items-center ${className}`}>
        {showControls && <PaginationPrevious />}
        <PaginationLinks />
        {showControls && <PaginationNext />}
      </div>
    </PaginationProvider>
  );
};

const PaginationPrevious = () => {
  const { initialPage, goToPage } = useContext(PaginationContext);

  if (initialPage === 1) return null;

  return (
    <Button
      isIconOnly="md"
      radius="smooth"
      variant="secondary"
      onClick={() => goToPage(initialPage - 1)}
    >
    </Button>
  );
};

const PaginationNext = () => {
  const { initialPage, total, goToPage } = useContext(PaginationContext);

  if (initialPage === total) return null;

  return (
    <Button
      isIconOnly="md"
      radius="smooth"
      variant="secondary"
      onClick={() => goToPage(initialPage + 1)}
    >
    </Button>
  );
};

const PaginationLinks = () => {
  const { initialPage, total, goToPage } = useContext(PaginationContext);
  
  if (initialPage > total) return null

  const maxVisiblePages = 5; // Número máximo de páginas visibles
  const half = Math.floor(maxVisiblePages / 2);

  // Calculamos el inicio y fin del rango visible
  const startPage = Math.max(1, initialPage - half);
  const endPage = Math.min(total, initialPage + half);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Comprobar si se deben mostrar puntos suspensivos
  const showEllipsisBefore = startPage > 2; // Mostrar "..." antes
  const showEllipsisAfter = endPage < total - 1; // Mostrar "..." después

  return (
    <>
      {showEllipsisBefore && (
        <>
          <Button
            isIconOnly="md"
            radius="smooth"
            variant="secondary"
            onClick={() => goToPage(1)}
          >
            ...
          </Button>
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          isIconOnly="md"
          radius="smooth"
          variant={initialPage === page ? "primary" : "secondary"}
          onClick={() => goToPage(page)}
        >
          {page}
        </Button>
      ))}

      {showEllipsisAfter && (
        <>
          <Button
            isIconOnly="md"
            radius="smooth"
            variant="secondary"
            onClick={() => goToPage(total)}
          >
            ...
          </Button>
        </>
      )}
    </>
  );
};

export { Pagination };
