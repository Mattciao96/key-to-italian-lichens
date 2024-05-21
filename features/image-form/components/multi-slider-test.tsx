"use client";
import { MultiSlider } from "@/components/multi-slider";
import React, { useRef, useEffect, useState } from 'react';

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export function MultiRangeForm({ form, data }) {

  /* const [localValues, setLocalValues] = useState([0, 5]);

  const handleValueChange = (newValues: any) => {
    setLocalValues(newValues);
  }; */
 

  return (
    <div className="grid gap-4 p-2 w-full max-w-[500px] bg-white border border-[#14424C]/20 rounded-[12px]">
      <FormField
        control={form.control}
        name={data.id}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{data.title}</FormLabel>
            <FormControl>
              <div className='flex justify-center pt-2'>
              <MultiSlider
                defaultValue={field.value}
                value={field.value}
                minStepsBetweenThumbs={0}
                max={5}
                min={1}
                step={1}
                onValueChange={field.onChange}
                className={cn("w-[100%]")}
                />
                </div>
            </FormControl>
            <div className="flex gap-2 flex-wrap pt-2">
              <ol className="text-sm flex flex-col items-center w-full gap-2">
                {field.value.map((value, index) => {
                  const itemIndex = data.items.findIndex(item => item.value === value);
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-start w-full border px-3 h-10 rounded-md"
                    >
                      <span></span>
                      <span>{index === 0 ? 'From:' : 'To:'} {`${data.items[itemIndex].value} - `} {data.items[itemIndex].text}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
