"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import RadioImageGroupForm from "@/features/image-form/components/radio-image-group";
import SelectedValues from "@/features/image-form/components/selected-values";
import SelectedValuesMobile from "@/features/image-form/components/selected-values-mobile";
import { filterData } from "@/features/image-form/data/filter-data";

const radioData = filterData;


const FormSchema = z.object({
  "4": z.optional(z.enum(["1", "2", "3"])),
  "26": z.optional(z.enum(["1", "2"])),
  "45": z.optional(z.enum(["1", "2"])),
  "53": z.optional(z.enum(["1", "2"])),
  "11": z.optional(z.enum(["1", "2"])),
  "7": z.optional(z.enum(["1", "2"])),
  "27": z.optional(z.enum(["1", "2"])),
  "41": z.optional(z.enum(["1", "2"])),
  "23": z.optional(z.enum(["1", "2"])),
  "33": z.optional(z.enum(["1", "2"])),
  "46": z.optional(z.enum(["1", "2"])),
  "37": z.optional(z.enum(["1", "2"])),
  "8": z.optional(z.enum(["1", "2"])),
  "34": z.optional(z.enum(["1", "2"])),
  "35": z.optional(z.enum(["1", "2"])),
  "52": z.optional(z.enum(["1", "2"])),
  "36": z.optional(z.enum(["1", "2"])),
  "42": z.optional(z.enum(["1", "2", "3"])),
  "12": z.optional(z.enum(["1", "3", "4", "5"])),
});

const emptyForm = {
  "4": null,
  "26": null,
  "45": null,
  "53": null,
  "11": null,
  "7": null,
  "27": null,
  "41": null,
  "23": null,
  "33": null,
  "46": null,
  "37": null,
  "8": null,
  "34": null,
  "35": null,
  "52": null,
  "36": null,
  "42": null,
  "12": null,
};

export default function RadioGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      "4": "1",
      "45": "2",
    },
  });

  return (
    <>
      <div className="sticky top-0 z-10 bg-teal-100 shadow-bottom p-2">
        <h1 className="pl-10 text-xl ">Key to Italian Lichens</h1>
      </div>
      <Form {...form}>
        <div className="px-2 relative md:grid md:grid-cols-[1fr_300px]">
          <form
            /* onSubmit={form.handleSubmit(onSubmit)} */ className="space-y-6"
          >
            {radioData.map((groupData) => (
              <RadioImageGroupForm
                key={groupData.id}
                form={form}
                groupData={groupData}
              />
            ))}
            <Button asChild type="submit">
              <Link
                href={{
                  pathname: "/key",
                  query: form.getValues(),
                }}
              >
                About
              </Link>
            </Button>
          </form>
          {/* <div className="none md:sticky  sticky top-10 pt-10 h-screen overflow-y-auto border-l border-border"> */}
          {/*  <div className="none md:fixed w-[290px] md:top-10 md:right-0 pt-10 h-screen overflow-y-auto"> */}
          <SelectedValues
            form={form}
            radioData={radioData}
            emptyForm={emptyForm}
          />
          <SelectedValuesMobile form={form}
            radioData={radioData}
            emptyForm={emptyForm}
          />
        </div>
        
      </Form>
    </>
  );
}

