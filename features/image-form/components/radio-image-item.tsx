/* eslint-disable @next/next/no-img-element */
"use client";
import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";

/* export default function RadioImageItem({ item }) {
  return (
    <FormItem
      key={item.value}
      className="flex items-center space-x-3 space-y-0"
    >
      <FormControl>
        <RadioGroupItem value={item.value.toString()} />
      </FormControl>
      <FormLabel className="font-normal">{item.text}</FormLabel>
    </FormItem>
  );
} */

export default function RadioImageItem({ groupId, item }) {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem
          value={item.value? item.value.toString() : ""}
          className="peer sr-only"
          id={`${groupId}-${item.value}`}
        /> 
      </FormControl>
      <FormLabel
        htmlFor={`${groupId}-${item.value}`}
        className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        <AspectRatio ratio={12 / 3} >
          <img src={item.image} alt="" className="rounded-md" />
        </AspectRatio>
        <p className="h-[42px] flex justify-center items-center ">
          <span className="text-center leading-5">
            {item.text}
          </span>
        </p>
      </FormLabel>
    </FormItem>
  );
}
