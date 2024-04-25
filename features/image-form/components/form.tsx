"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import RadioImageGroupForm from "@/features/image-form/components/radio-image-group";
import SelectedValues from "@/features/image-form/components/selected-values";
import { filterData } from "@/features/image-form/data/filter-data";
const radioData = filterData;

const FormSchema = z.object({
  "4": z.optional(z.enum(["1", "2", "3"])),
  "26": z.optional(z.enum(["1", "2"])),
  "45": z.optional(z.enum(["1", "2"])),
  "53": z.optional(z.enum(["1", "2"])),
  "11": z.optional(z.enum(["1", "2"])),
  "7": z.optional(z.enum(["1", "2"])),
});

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
        <div className="relative md:grid md:grid-cols-[1fr_300px]">
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
            <SelectedValues form={form} radioData={radioData} />
          {/* </div> */}
        </div>
      </Form>
      <MobileBottomNavbar />
    </>
  );
}

export function MobileBottomNavbar() {
  return (
    <div className="justify-evenly md:hidden bottom-0 left-0 right-0 bg-white shadow-top p-2 flex  w-full">
      <div className="flex justify-center items-center">
        <Button className="text-xl">
          <span className="sr-only">Previous</span>
          {"<"}
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <Button className="text-xl">Submit</Button>
      </div>
      <div className="flex justify-center items-center">
        <Button className="text-xl">
          <span className="sr-only">Next</span>
          {">"}
        </Button>
      </div>
    </div>
  );
}
