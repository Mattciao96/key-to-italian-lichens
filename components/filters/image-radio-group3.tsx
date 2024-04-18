/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
// SHADCN COMPONENTS
import { CircleX } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  type: z.number),
})

type RadioItem = {
  text: string;
  value: number;
  image: string;
};

type RadioGroupDepend = {
  id: number;
  item: number;
};

type RadioGroup = {
  id: number;
  title: string;
  description: string;
  depend?: RadioGroupDepend;
  items: RadioItem[];
};

export function RadioGroupImages({
  radioGroupData,
  className = "",
}: {
  radioGroupData: RadioGroup;
  className?: string;
}) {
  const { id, title, description, items } = radioGroupData;
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleRadioChange = (value: string | null) => {
    setSelectedValue(value);
  };
  return (
    <div className={cn("relative", className)}>
       <div className="flex flex-col space-y-1.5 p-6">
        <h2>{title}</h2>
        </div>
      {selectedValue && (
        <Button
          className="absolute rounded-full py-1 px-2  top-2 right-2 bg-transparent hover:bg-transparent"
          onClick={() => setSelectedValue(null)}
        >
          <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
        </Button>
      )}

      <RadioGroup
        /* defaultValue="card" */
        className="flex flex-wrap justify-center max-w-[1200px] gap-4"
        onValueChange={handleRadioChange}
        value={selectedValue}
      >
        {items.map((item) => (
          <RadioImage key={item.value} group={id} itemData={item} />
        ))}
      </RadioGroup>
    </div>
  );
}

function RadioImage({ itemData, group }: { itemData: RadioItem; group: number | string }) {
  const { text, value, image } = itemData;
  return (
    <div>
      <RadioGroupItem
        value={value}
        id={`${group}-${value}`}
        className="peer sr-only"
      />
      <Label
        htmlFor={`${group}-${value}`}
        className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        <AspectRatio ratio={12 / 3}>
          <img src={image} alt="" className="rounded-md" />
        </AspectRatio>
        <p className="h-[42px] flex justify-center items-center ">
          <span className="text-center leading-5">{text}</span>
        </p>
      </Label>
    </div>
  );
}

function FullForm() {
  return (
    {'to do'})
}