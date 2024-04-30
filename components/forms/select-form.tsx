"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectForm({ form, data }) {
  const [value, setValue] = useState<string | undefined>(undefined)
  return (
    <FormField
      control={form.control}
      name={data.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{data.title}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select a ${data.title}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="">
             
              {data.items.map((item) => (
                <SelectItem className="" key={item.value} value={item.value}>
                  {item.text}
                </SelectItem>
              ))}
              <Button
            className="w-full px-2"
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              setValue(undefined)
              
            }}
          >
            Clear
          </Button>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
