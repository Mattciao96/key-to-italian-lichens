/* eslint-disable @next/next/no-img-element */
"use client";
import { VirtuosoGrid } from 'react-virtuoso'
import { forwardRef } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { cn } from '@/lib/utils'
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBar />
    </QueryClientProvider>
  );
}

export function SearchBar() {
  const searchParams = useSearchParams();

 

  /* const fetchTaxa = async () => {
    const { data } = await axios.post('https://italic.units.it/api/v1/taxa-filter', { params: searchParams })
    return data
  } */

  /* const italyKey = useQuery({
    queryKey: ["italyKey"],
    queryFn: () =>
      fetch("https://italic.units.it/api/v1/italy-key").then((res) =>
        res.json()
      ),
  }); */
  const taxaFilter = useQuery({
    queryKey: ["taxaFilter", searchParams],
    queryFn: () =>
      fetch("https://italic.units.it/api/v1/taxa-filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchParams),
      }).then((res) => res.json()),
  });
  
  if (taxaFilter.isPending) return "Loading...";
  /* if (italyKey.isPending) return "Loading...";
  if (italyKey.error) return "An error has occurred: " + italyKey.error.message; */
  if (taxaFilter.error)
    return "An error has occurred: " + taxaFilter.error.message;

 

}


