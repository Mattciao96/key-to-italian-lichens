"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import RadioImageGroupForm from "@/features/image-form/components/radio-image-group";
import SelectedValues from "@/features/image-form/components/selected-values";
import { filterData } from "@/features/image-form/data/filter-data";
const radioData = filterData;


const FormSchema = z.object({
  4: z.optional(z.string()),
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <div className="relative grid grid-cols-2 bg-zinc-700">
     
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {radioData.map((groupData) => (
              <RadioImageGroupForm
                key={groupData.id}
                form={form}
                groupData={groupData}
              />
            ))}
            <Button type="submit">Submit</Button>
          </form>
      
   
          <SelectedValues
            
            form={form}
            radioData={radioData}
          />
   
      </div>
    </Form>
  );
}
