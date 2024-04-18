"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";


const radioData = {
  id: 4,
  title: "Substratum",
  description: "This is group 1",
  items: [
    { text: "Bark and wood", value: 1, image: "bark.png" },
    { text: "Rock", value: 3, image: "rock.png" },
    {
      text: "Soil, terricolous mosses and plant debris",
      value: 2,
      image: "soil.png",
    },
  ],
};
// 3: zod schema

/* const TraitSchema = z.object({
  4: z.optional(z.number()),
});*/

const FormSchema = z.object({
  4: z.optional(z.string()),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name={radioData.id.toString()}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={radioData.items[0].value.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {radioData.items[0].text}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={radioData.items[1].value.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">
                    {radioData.items[1].text}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={radioData.items[2].value.toString()} />
                    </FormControl>
                    <FormLabel className="font-normal">{radioData.items[2].text}</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              {field && <button
                type="button"
                
                onClick={(e) => {
                  field.onChange();
                  form.resetField(radioData.id.toString());
                }}
              >
                {field.value || "und"}
              </button>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
