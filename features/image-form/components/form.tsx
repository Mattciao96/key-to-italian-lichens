"use client";
import  Link  from "next/link";
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
  4: z.optional(z.literal([1, 2, 3])),
  26: z.optional(z.string()),
  45: z.optional(z.string()),
  53: z.optional(z.string()),
  11: z.optional(z.string()),
  7: z.optional(z.string()),
});

export default function RadioGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <>
      <div className="sticky top-0 z-10 bg-yellow-200 shadow-bottom p-2">
        <h1 className="text-lg font-bold">Key to Italian Lichens</h1>
      </div>
      <Form {...form}>
        <div className="relative md:grid md:grid-cols-[1fr_300px]">
          <form /* onSubmit={form.handleSubmit(onSubmit)} */ className="space-y-6">
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
                  query: form.getValues()
                }}
              >
                About
              </Link>
            </Button>
          </form>
          <div className="h-10 none md:sticky top-7">
            <div className="relative overflow-hidden pb-10">
              <SelectedValues form={form} radioData={radioData} />
            </div>
          </div>
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
