'use client'
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Virtualizer } from "virtua";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command";
import { ChevronsUpDown, X, Check } from "lucide-react";

const POPOVER_WIDTH = "w-full max-w-[500px]";


const searchFn = async () => {
  console.log("runno");

  const response = await fetch(`https://italic.units.it/api/v1/genera`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const useSearch = (query) => {
  const [debouncedSearchQuery] = useDebounce(query, 1000);
  const enabled = debouncedSearchQuery.length >= 1;
  const { data, isLoading: isLoadingOrig, isError } = useQuery({
    queryKey: ["fam"],
    enabled,
    refetchOnMount: false,
    queryFn: async () => {
      console.log("runno");
    
      const response = await fetch(`https://italic.units.it/api/v1/genera`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  });
  const isLoading = enabled && isLoadingOrig;
  return { data, enabled, isLoading, isError, debouncedSearchQuery };
};

const SearchResults = ({ query, selectedResult, onSelectResult, scrollRef, }) => {
  const { data, enabled, isLoading, isError, debouncedSearchQuery } = useSearch(query, searchFn);
  const sortedNames = React.useMemo(() => {
    if (!data) {
      return [];
    }
    if (debouncedSearchQuery === "") return data;
    return data
      .filter((value) => value.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      .sort((a, b) => {
        const aStartsWithQuery = a.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase());
        const bStartsWithQuery = b.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase());
        if (aStartsWithQuery && bStartsWithQuery) {
          return data.indexOf(a) - data.indexOf(b);
        }
        if (aStartsWithQuery) return -1;
        if (bStartsWithQuery) return 1;
        return 0;
      });
  }, [data, debouncedSearchQuery]);

  if (!enabled) return null
  if (isError) return <div className="p-4 text-sm">No products found</div>;
  if (isLoading || query !== debouncedSearchQuery) {
    return <div className="p-4 text-sm">Searching...</div>;
  }
  if (!isError && !isLoading && query === debouncedSearchQuery && !data?.length) {
    return <div className="p-4 text-sm">No data found</div>;
  }

  return (
    <Virtualizer scrollRef={scrollRef}>
      {sortedNames.map((name) => {
        const parts = debouncedSearchQuery === "" ? [name] : name.split(new RegExp(`(${debouncedSearchQuery})`, "i"));
        return (
          <CommandItem key={name} onSelect={() => onSelectResult(name)} value={name}>
            <Check className={cn("mr-1 h-4 w-4 min-w-4", selectedResult === name ? "opacity-100" : "opacity-0")} />
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
    </Virtualizer>
  );
};

export function SearchComboBox({ selectedResult, onSelectResult}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  const handleSelectResult = (searchInput) => {
    onSelectResult(searchInput);
  };

  return (
    <Command shouldFilter={false} className="">
      <CommandInput value={searchQuery} onValueChange={setSearchQuery} placeholder="Search a lichen" />
      <CommandGroup>
        <CommandList ref={ref}>
          <SearchResults query={searchQuery} selectedResult={selectedResult} onSelectResult={handleSelectResult} scrollRef={ref} />
        </CommandList>
      </CommandGroup>
    </Command>
  );
}

export default function ComboBox() {
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleSetSelectedValue = React.useCallback((selectedValue: string) => {
    setSelected(selectedValue);
    setOpen(false);
  }, []);

  const displayName = selected ? selected : "Select a lichen";

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <div className="relative w-[500px]">
          <PopoverTrigger asChild className="w-full">
            <Button variant="outline" role="combobox" className={cn("justify-between", POPOVER_WIDTH)}>
              {displayName}
              {selected === "" && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
            </Button>
          </PopoverTrigger>
          {selected !== "" && (
            <Button className="absolute right-0 rounded-full bg-transparent hover:bg-transparent" onClick={(e) => {
              e.stopPropagation();
              setSelected("");
            }}>
              <X className="text-primary h-4 w-4 shrink-0 opacity-50 hover:opacity-100 hover:text-destructive"></X>
            </Button>
          )}
        </div>
        <PopoverContent side="bottom" className={cn("p-0 popover-content-width-same-as-its-trigger", POPOVER_WIDTH)}>
          <SearchComboBox selectedResult={selected} onSelectResult={handleSetSelectedValue} />
        </PopoverContent>
      </Popover>
    </div>
  );
}