// the idea is to first call react query to get the data
// then perform the filter
// in a perfect world we should have different components

// 1:
// data retrived at the beginning
// choose when start to show the possible results
// 2:
// data retrived dinamically

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
  console.log('gettdata');
  
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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getFamilies(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
            {value ? data.find((item) => item === value) : "Select a family"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search) => {
              //if (search.length < 2) return 0;
  
              if (search.length < 2) return 0;

              //if (value.toLowerCase().includes(search.toLowerCase())) return 1;
              if (value.toLowerCase().startsWith(search.toLowerCase()))
                return 1;

              return 0;
            }}
          >
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data &&
                  data.map((item) => {
                    console.log(item);
                    
                    return (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === item ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
