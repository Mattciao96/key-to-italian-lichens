'use client'
import * as React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";


export type UseSortedNames = (data: any[], query: string) => string[];

export const useDefaultSortedNames: UseSortedNames = (data, query) => {
  return React.useMemo(() => {
    if (!data) {
      return [];
    }
    if (query === "") return data;
    return data
      .filter((value) => value.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        const aStartsWithQuery = a
          .toLowerCase()
          .startsWith(query.toLowerCase());
        const bStartsWithQuery = b
          .toLowerCase()
          .startsWith(query.toLowerCase());
        if (aStartsWithQuery && bStartsWithQuery) {
          return data.indexOf(a) - data.indexOf(b);
        }
        if (aStartsWithQuery) return -1;
        if (bStartsWithQuery) return 1;
        return 0;
      });
  }, [data, query]);
}












type SearchDataItem = string | number | object;

export type UseSearch = (query: string) => {
  data: SearchDataItem[];
  enabled: boolean;
  isLoading: boolean;
  isError: boolean;
  debouncedSearchQuery: string;
};
export const useSearch: UseSearch = (query) => {
  const [debouncedSearchQuery] = useDebounce(query, 1000);
  const enabled = debouncedSearchQuery.length >= 1;
  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ["genus"],
    enabled,
    refetchOnMount: false,
    staleTime: Infinity,
    queryFn: async () => {
      console.log("runno");

      const response = await fetch(`https://italic.units.it/api/v1/genera`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const isLoading = enabled && isLoadingOrig;
  return { data, enabled, isLoading, isError, debouncedSearchQuery };
};



export const useFamilySearch: UseSearch = (query) => {
  const [debouncedSearchQuery] = useDebounce(query, 200);
  const enabled = debouncedSearchQuery.length >= 0;
  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ["family"],
    enabled,
    refetchOnMount: false,
    staleTime: Infinity,
    queryFn: async () => {
      const response = await fetch(`https://italic.units.it/api/v1/families`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  const isLoading = enabled && isLoadingOrig;
  return { data, enabled, isLoading, isError, debouncedSearchQuery };
};

