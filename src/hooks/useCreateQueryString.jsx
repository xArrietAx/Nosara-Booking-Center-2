"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const useCreateQueryString = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = (keyOrObject, value = null, newPathname = null, anchor = "") => {
    const params = new URLSearchParams(searchParams.toString());

    if (keyOrObject === null) {
      // Si el valor es null, eliminamos todos los parámetros
      const newUrl = `${pathname}${anchor ? `#${anchor}` : ""}`;
      router.replace(newUrl, { scroll: anchor ? true : false });
      return;
    }

    if (typeof keyOrObject === "object") {
      // Si keyOrObject es un objeto, actualizamos los parámetros con su contenido
      Object.entries(keyOrObject).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          // Si el valor es un array, agregamos cada elemento como un valor separado para la misma clave
          val.forEach((item) => {
            if (item || item === 0) {
              params.append(key, item);
            } else {
              params.delete(key);
            }
          });
        } else if (val || val === 0) {
          // Si el valor no es un array, simplemente lo seteamos
          params.set(key, val);
        } else {
          // Si el valor es nulo o indefinido, eliminamos el parámetro
          params.delete(key);
        }
      });
    } else {
      // Si el parámetro es una clave simple, usamos su valor como único
      if (Array.isArray(value)) {
        // Si el valor es un array, agregamos cada elemento como un valor separado para la misma clave
        value.forEach((item) => {
          if (item || item === 0) {
            params.append(keyOrObject, item);
          } else {
            params.delete(keyOrObject);
          }
        });
      } else {
        if (value || value === 0) {
          params.set(keyOrObject, value);
        } else {
          params.delete(keyOrObject);
        }
      }
    }

    const newUrl = `${newPathname ? newPathname : pathname}?${params.toString()}${anchor ? `#${anchor}` : ""}`;
    router.push(newUrl, { scroll: anchor ? true : false });
  };

  return { createQueryString, searchParams };
};

export default useCreateQueryString;
