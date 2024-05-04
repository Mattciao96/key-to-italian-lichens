"use client";
// libraries
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Virtualizer, VList } from "virtua";
// utils
import { cn } from "@/lib/utils";
// components
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
// icons
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";

const POPOVER_WIDTH = "w-full max-w-[500px]";

// useful to get autocomplete on small lists (synced with the server)
// a shadcn combobox that load data only on mount from server
// data from the server doesn't change
// STYLE:
// a close button is created when a value is selected
// for now it is not a button because PopoverTrigger is already a button
// popover-content-width-same-as-its-trigger and POPOVER_WIDTH override radix (small) max-width
export default function ComboBoxInitialDataServer() {
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleSetSelectedValue = React.useCallback((selectedValue: string) => {
    setSelected(selectedValue);
    setOpen(false);
  }, []);

  const displayName = selected ? selected : "Select a lichen";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-[600px]">
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", POPOVER_WIDTH)}
        >
          {selected}

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
        <SearchComboBoxInitialDataServer
          selectedResult={selected}
          onSelectResult={handleSetSelectedValue}
        />
      </PopoverContent>
    </Popover>
  );
}

export function SearchComboBoxInitialDataServer({
  selectedResult,
  onSelectResult,
}: {
  selectedResult: string;
  onSelectResult: (result: string) => void;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (searchInput: string) => {
    onSelectResult(searchInput);
  };

  return (
    <Command shouldFilter={false} className="">
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

const searchFn = async () => {
  console.log("runno");

  const response = await fetch(`https://italic.units.it/api/v1/families`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function SearchResults({ query, selectedResult, onSelectResult }) {
  const [debouncedSearchQuery] = useDebounce(query, 1000);
  const ref = React.useRef<HTMLDivElement>(null);

  const enabled = debouncedSearchQuery.length >= 0;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ["fam"],
    enabled,
    refetchOnMount: false,
    queryFn: () => searchFn(),
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  const sortedNames = React.useMemo(() => {
    if (!data) {
      return [];
    }
    if (debouncedSearchQuery === "") return data;
    return data
      .filter((value) => {
        if (value.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
          return 1;
        return 0;
      })
      .sort((a, b) => {
        const aStartsWithQuery = a
          .toLowerCase()
          .startsWith(debouncedSearchQuery.toLowerCase());
        const bStartsWithQuery = b
          .toLowerCase()
          .startsWith(debouncedSearchQuery.toLowerCase());

        if (aStartsWithQuery && bStartsWithQuery) {
          return data.indexOf(a) - data.indexOf(b);
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
    !data?.length
  ) {
    return <div className="p-4 text-sm">No data found</div>;
  }

  const windowHeight = sortedNames.length >= 10 ? '500px' : `${sortedNames.length * 32}px`

  return (
    <div style={{height: windowHeight}}>
    <VList>
      {sortedNames.map((name) => {
        const parts = debouncedSearchQuery === '' ? [name] : name.split(new RegExp(`(${debouncedSearchQuery})`, "i"));

        return (
          <CommandItem
            key={name}
            onSelect={() => onSelectResult(name)}
            value={name}
          >
            <Check
              className={cn(
                "mr-1 h-4 w-4 min-w-4",
                selectedResult === name ? "opacity-100" : "opacity-0"
              )}
            />
            <span>
              {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                  <span className="text-teal-600" key={index}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          </CommandItem>
        );
      })}
      </VList>
      </div>
  );
}
