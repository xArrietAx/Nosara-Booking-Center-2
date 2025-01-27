"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useUpdateQuery() {
  const router = useRouter();

  const updateQuery = useCallback((key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "None") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router]);

  return updateQuery;
}
