"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const POPOVER_WIDTH = "w-full max-w-[500px]";

export default function ComboboxDemo() {
  const [selected, setSelected] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSetActive = React.useCallback((product) => {
    setSelected(product);

    // OPTIONAL: close the combobox upon selection
    setOpen(false);
  }, []);

  const displayName = selected ? selected.name : "Select a lichen";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-[600px]">
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", POPOVER_WIDTH)}
        >
          {displayName}

          {selected !== "" ? (
            <div
              className="bg-red-600 h-4 w-4 shrink-0 opacity-50 hover:bg-red-900"
              onClick={(e) => {
                e.stopPropagation();
                setSelected("");
              }}
            ></div>
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        className={cn(
          "p-0 popover-content-width-same-as-its-trigger",
          POPOVER_WIDTH
        )}
      >
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}

import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";

import { Check } from "lucide-react";

export function Search({ selectedResult, onSelectResult }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (product) => {
    onSelectResult(product);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command
      shouldFilter={false}
      className=""
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search a lichen"
      />
      <CommandGroup>
        <CommandList>
          <SearchResults
            query={searchQuery}
            selectedResult={selectedResult}
            onSelectResult={handleSelectResult}
          />
        </CommandList>
      </CommandGroup>
    </Command>
  );
}

const searchFn = async (query) => {
  const response = await fetch(
    `https://italic.units.it/api/v1/namelist/${query}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function SearchResults({ query, selectedResult, onSelectResult }) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = debouncedSearchQuery.length >= 5;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    /* queryFn: () => searchProductsByName(debouncedSearchQuery), */
    /* queryFn: () =>
      fetch(`https://italic.units.it/api/v1/namelist/${query}`).then((res) =>
        res.json()
      ), */
    enabled,
    queryFn: () => searchFn(debouncedSearchQuery),
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  const sortedNames = React.useMemo(() => {
    if (!data || !data.names) {
      return [];
    }
    return data.names.sort((a, b) => {
      const aStartsWithQuery = a.name
        .toLowerCase()
        .startsWith(debouncedSearchQuery.toLowerCase());
      const bStartsWithQuery = b.name
        .toLowerCase()
        .startsWith(debouncedSearchQuery.toLowerCase());

      if (aStartsWithQuery && bStartsWithQuery) {
        return data.names.indexOf(a) - data.names.indexOf(b);
      }
      if (aStartsWithQuery) return -1;
      if (bStartsWithQuery) return 1;
      return 0;
    });
  }, [data, debouncedSearchQuery]);

  if (!enabled) return null;
  if (isError) return <div className="p-4 text-sm">No products found</div>;
  if (isLoading || query !== debouncedSearchQuery) {
    return <div className="p-4 text-sm">Searching...</div>;
  }
  if (
    !isError &&
    !isLoading &&
    query === debouncedSearchQuery &&
    !data?.names.length
  ) {
    return <div className="p-4 text-sm">No data found</div>;
  }

  return (
    <>
      {sortedNames.map(({ id, name }) => {
        const parts = name.split(new RegExp(`(${query})`, "i"));

        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, name })}
            value={name}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedResult?.id === id ? "opacity-100" : "opacity-0"
              )}
            />
            <span>
              {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                  <strong className='text-teal-600' key={index}>{part}</strong>
                ) : (
                  part
                )
              )}
            </span>
          </CommandItem>
        );
      })}
    </>
  );
}
