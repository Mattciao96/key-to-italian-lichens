/* eslint-disable @next/next/no-img-element */
/*
form whit radio groups images
difficult things
- displayed value different from the value that is sent
- react hook form and zod integration
- x button to clear the selected value
very difficult things
- some radio groups depend on the selected value of another radio group
- make the component reusable

imports
- zod
- react-hook-form
shadcn forms and radio groups
*/
"use client";
// 1: imports

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
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

// 2: form data
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

const TraitSchema = z.object({
  4: z.optional(z.number()),
});

export default function RadioGroupForm() {
  const form = useForm<z.infer<typeof TraitSchema>>({
    resolver: zodResolver(TraitSchema),
  });

  function onSubmit(data: z.infer<typeof TraitSchema>) {
    console.log("launch");
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
              <FormLabel>{radioData.title}</FormLabel>

              <FormControl>
                <>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={radioData.items[0].value}
                        className="peer sr-only"
                        id={`${radioData.id}-${radioData.items[0].value}`}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`${radioData.id}-${radioData.items[0].value}`}
                      className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <AspectRatio ratio={12 / 3}>
                        <img
                          src={radioData.items[0].image}
                          alt=""
                          className="rounded-md"
                        />
                      </AspectRatio>
                      <p className="h-[42px] flex justify-center items-center ">
                        <span className="text-center leading-5">
                          {radioData.items[0].text}
                        </span>
                      </p>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={radioData.items[1].value}
                        className="peer sr-only"
                        id={`${radioData.id}-${radioData.items[1].value}`}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`${radioData.id}-${radioData.items[1].value}`}
                      className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <AspectRatio ratio={12 / 3}>
                        <img
                          src={radioData.items[1].image}
                          alt=""
                          className="rounded-md"
                        />
                      </AspectRatio>
                      <p className="h-[42px] flex justify-center items-center ">
                        <span className="text-center leading-5">
                          {radioData.items[1].text}
                        </span>
                      </p>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value={radioData.items[2].value}
                        className="peer sr-only"
                        id={`${radioData.id}-${radioData.items[2].value}`}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor={`${radioData.id}-${radioData.items[2].value}`}
                      className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <AspectRatio ratio={12 / 3}>
                        <img
                          src={radioData.items[2].image}
                          alt=""
                          className="rounded-md"
                        />
                      </AspectRatio>
                      <p className="h-[42px] flex justify-center items-center ">
                        <span className="text-center leading-5">
                          {radioData.items[2].text}
                        </span>
                      </p>
                    </FormLabel>
                  </FormItem>
                  
                </RadioGroup>
                <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <Button
                        className="absolute rounded-full py-1 px-2  top-2 right-2 bg-transparent hover:bg-transparent"
                        onClick={(e) => { e.preventDefault(); form.resetField(radioData.id.toString()) }}
                      >
                        <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
                      </Button>
                    </FormControl>
                  </FormItem>
                  </>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
