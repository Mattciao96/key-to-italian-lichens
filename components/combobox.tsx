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
import { Search } from "@/components/search";

const POPOVER_WIDTH = "w-full max-w-[500px]";

export default function ComboBox({selected, setSelected }) {
  const [open, setOpen] = React.useState(false);
  

  const handleSetActive = React.useCallback((product: Product) => {
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

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn("p-0 popover-content-width-same-as-its-trigger", POPOVER_WIDTH, )}>
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}