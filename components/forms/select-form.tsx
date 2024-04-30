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
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <FormField
      control={form.control}
      name={data.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{data.title}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="[&>span]:line-clamp-0 [&>span]:text-left">
                <SelectValue placeholder={`Select a ${data.title}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-w-[98vw]">
              {data.items.map((item) => (
                <SelectItem className="" key={item.value} value={item.value}>
                  {item.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
