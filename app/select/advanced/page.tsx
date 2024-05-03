// from the base the idea is to override the default behiavour of filter base
// so i can select from where to start
"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const queryClient = new QueryClient();

type FamilyData = string[];

async function getFamilies(): Promise<FamilyData> {
  const response = await fetch("https://italic.units.it/api/v1/families");
  const data: FamilyData = await response.json();
  console.log("gettdata");

  return data;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ComboboxDemo />
    </QueryClientProvider>
  );
}

export function ComboboxDemo() {
  /* const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getFamilies(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
 */

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});

  const handleSetActive = React.useCallback((product) => {
    setSelected(product);

    // OPTIONAL: close the combobox upon selection
    setOpen(false);
  }, []);

  const displayedValue = selected ? selected.name : "Select a lichen";

  return (
    <div className="h-[800px] flex items-center justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {displayedValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <ComboBoxSearch
            selectedResult={selected}
            onSelectResult={handleSetActive}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ComboBoxSearch({ selectedResult, onSelectResult }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSelectResult = (product: Product) => {
    onSelectResult(product);
  };
  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search a lichen"
      />

      <ComboBoxSearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

function ComboBoxSearchResults({ query, selectedResult, onSelectResult }) {
  const enabled = query.length >= 2;

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getFamilies(),
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isPending;

  if (!enabled) return null;

  return (
    <CommandList>
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!error && !isLoading && !data?.length && (
        <div className="p-4 text-sm">No products found</div>
      )}
      {error && <div className="p-4 text-sm">Something went wrong</div>}
      <CommandGroup>
        {data
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
          })
          .map(({ name }) => {
            const parts = name.split(new RegExp(`(${query})`, "i"));

            return (
              <CommandItem
                key={name}
                onSelect={() => onSelectResult({ name })}
                value={name}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedResult === name ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>
                  {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                      <strong key={index}>{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </CommandItem>
            );
          })}
      </CommandGroup>
    </CommandList>
  );
}
