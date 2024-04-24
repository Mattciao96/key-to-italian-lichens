/* eslint-disable @next/next/no-img-element */
"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageList />
    </QueryClientProvider>
  );
}

export function ImageList() {

  const taxaFilter = useQuery({
    queryKey: ["taxaFilter"],
    queryFn: () =>
      fetch("https://italic.units.it/api/v1/taxa-filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).then((res) => res.json()),
  });

  if (taxaFilter.isPending) return "Loading...";
  /* if (italyKey.isPending) return "Loading...";
  if (italyKey.error) return "An error has occurred: " + italyKey.error.message; */
  if (taxaFilter.error)
    return "An error has occurred: " + taxaFilter.error.message;

  return (
    <div className="w-full flex justify-center">
      <ul className="p-2 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 max-w-[900px]">
        {taxaFilter.data.map((taxon) => (
          <li key={taxon.species_id}>
            <img
              loading="lazy"
              alt={taxon.name}
              className="aspect-[4/3] w-full rounded-md object-cover"
              height="120"
              src={
                taxon.thumbnail
                  ? `https://italic.units.it/flora/${taxon.thumbnail}`
                  : "placeholder.svg"
              }
              width="90"
            />
            <p className="px-1 pt-1 text-sm">{taxon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
