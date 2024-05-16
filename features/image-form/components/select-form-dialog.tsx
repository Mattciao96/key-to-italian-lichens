"use client";
import { useEffect } from "react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ResetFieldButton } from "./reset-field-button";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SelectForm({ form, data }) {
  const [open, setOpen] = React.useState(false);
  const handleSetSelectedValue = React.useCallback((selectedValue: string) => {
    //setSelected(selectedValue);
    form.setValue(data.title, selectedValue);
    setOpen(false);
  }, []);

  const watchDependValue = data.depend ? form.watch(data.depend.id) : undefined;

  useEffect(() => {
    // 2: if the depend item is not selected, hide the group
    if (data.depend && watchDependValue !== data.depend.item) {
      // 3: remove the value from the form only if is not already undefined (otherwise it wil trigger infinite rerenders)
      if (form.getValues(data.id)) {
        form.resetField(data.id);
      }
    }
  }, [watchDependValue, form, data]);

  if (data.depend && watchDependValue !== data.depend.item) {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name={data.id}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{data.title}</FormLabel>

          <Dialog open={open} onOpenChange={setOpen}>
            <div className="relative">
              <DialogTrigger asChild className="w-full">
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={"justify-between w-full"}
                  >
                    {field.value ? field.value : data.title}
                   
                  </Button>
                </FormControl>
              </DialogTrigger>
              {field.value !== "" && field.value !== undefined && (
                <Button
                  className="absolute right-0 rounded-full bg-transparent hover:bg-transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    form.resetField(data.title, { defaultValue: "" });
                  }}
                >
                  X
                </Button>
              )}
            </div>

            <DialogContent
              side="bottom"
              className="mt-1 rounded-md top-0 translate-y-0 p-0 w-[98vw]"
            >
              <Label className="pt-4 pl-4 ">{data.title}</Label>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="[&>span]:line-clamp-0 [&>span]:text-left">
                    <SelectValue placeholder={`Select a ${data.title}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-w-[98vw]">
                  {data.items.map((item) => (
                    <SelectItem
                      className=""
                      key={item.value}
                      value={item.value}
                    >
                      {item.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
