"use client";
import * as React from "react";

import { Virtualizer } from "virtua";
import { cn } from "@/lib/utils";
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
  CommandEmpty
} from "@/components/ui/command";
import { ChevronsUpDown, X, Check } from "lucide-react";
import {
  UseSearch,
  UseSortedNames,
} from "@/features/image-form/utils/combobox-utils";

const POPOVER_WIDTH = "w-full max-w-[500px]";

type ComboboxText = {
  labelText: string;
  triggerText: string;
  searchText: string;
  loadingText: string;
  errorText: string;
  noResultsText: string;
};
// like this
/* const text = {
  triggerText: "Select a family",
  searchText: "Insert at least one character",
  loadingText: 'Loading...',
  errorText: 'Error loading data',
  noResultsText: 'No families found'
}; */

interface SearchResultsProps {
  text: ComboboxText;
  query: string;
  selectedResult: string;
  onSelectResult: (value: string) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  useSearch: UseSearch;
  useSortedNames: UseSortedNames;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  text,
  query,
  selectedResult,
  onSelectResult,
  scrollRef,
  useSearch,
  useSortedNames,
}) => {
  const { data, enabled, isLoading, isError, debouncedSearchQuery } =
    useSearch(query);
  const sortedNames = useSortedNames(data, debouncedSearchQuery);

  if (!enabled) return null;
  if (isError) return <div className="p-4 text-sm">{text.errorText}</div>;
  if (isLoading || query !== debouncedSearchQuery) {
    return <div className="p-4 text-sm">{text.loadingText}</div>;
  }
  // SHOULD be replaced by CommandEmpty
  /* if (
    !isError &&
    !isLoading &&
    query === debouncedSearchQuery &&
    !data?.length
  ) {
    return <div className="p-4 text-sm">{text.noResultsText}</div>;
  } */

  return (
    <Virtualizer scrollRef={scrollRef}>
      <CommandEmpty className="py-1.5">{text.noResultsText}</CommandEmpty>
      {sortedNames.map((name) => {
        const parts =
          debouncedSearchQuery === ""
            ? [name]
            : name.split(new RegExp(`(${debouncedSearchQuery})`, "i"));
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
    </Virtualizer>
  );
};

interface SearchComboBoxProps {
  text: ComboboxText;
  selectedResult: string;
  onSelectResult: (value: string) => void;
  useSearch: UseSearch;
  useSortedNames: UseSortedNames;
}

export const SearchComboBox: React.FC<SearchComboBoxProps> = ({
  text,
  selectedResult,
  onSelectResult,
  useSearch,
  useSortedNames,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  const handleSelectResult = (searchInput: string) => {
    onSelectResult(searchInput);
  };

  return (
    <Command shouldFilter={false} className="">
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder={text.searchText}
      />
      <CommandGroup>
        <CommandList ref={ref}>
          <SearchResults
            text={text}
            query={searchQuery}
            selectedResult={selectedResult}
            onSelectResult={handleSelectResult}
            scrollRef={ref}
            useSearch={useSearch}
            useSortedNames={useSortedNames}
          />
        </CommandList>
      </CommandGroup>
    </Command>
  );
};

interface ComboBoxProps {
  text: ComboboxText;
  useSearch: UseSearch;
  useSortedNames: UseSortedNames;
}
export const ComboBox: React.FC<ComboBoxProps> = ({
  text,
  useSearch,
  useSortedNames,
}) => {
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleSetSelectedValue = React.useCallback((selectedValue: string) => {
    setSelected(selectedValue);
    setOpen(false);
  }, []);

  const displayName = selected ? selected : text.triggerText;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-[500px]">
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between", POPOVER_WIDTH)}
          >
            {displayName}
            {selected === "" && (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        {selected !== "" && (
          <Button
            className="absolute right-0 rounded-full bg-transparent hover:bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              setSelected("");
            }}
          >
            <X className="text-primary h-4 w-4 shrink-0 opacity-50 hover:opacity-100 hover:text-destructive"></X>
          </Button>
        )}
      </div>
      <PopoverContent
        side="bottom"
        className={cn(
          "p-0 popover-content-width-same-as-its-trigger",
          POPOVER_WIDTH
        )}
      >
        <SearchComboBox
          text={text}
          selectedResult={selected}
          onSelectResult={handleSetSelectedValue}
          useSearch={useSearch}
          useSortedNames={useSortedNames}
        />
      </PopoverContent>
    </Popover>
  );
};
