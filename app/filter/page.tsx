"use client";
import { useState } from "react";
// SHADCN COMPONENTS
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function DemoPaymentMethod() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Substratum:</CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup
            /* defaultValue="card" */
            className="flex flex-col max-w-[400px] gap-4"
            onChange={handleRadioChange}
          >
            <div>
              <RadioGroupItem value="bark" id="bark" className="peer sr-only" />
              <Label
                htmlFor="bark"
                className="flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <AspectRatio ratio={12 / 3}>
                  <img src="bark.png" alt="" className="rounded-md" />
                </AspectRatio>
                Bark and wood
              </Label>
            </div>
            <div>
              <RadioGroupItem value="rock" id="rock" className="peer sr-only" />
              <Label
                htmlFor="rock"
                className="flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <AspectRatio ratio={12 / 3}>
                  <img src="rock.png" alt="" className="rounded-md" />
                </AspectRatio>
                Rock
              </Label>
            </div>
            <div>
              <RadioGroupItem value="soil" id="soil" className="peer sr-only" />
              <Label
                htmlFor="soil"
                className="flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <AspectRatio ratio={12 / 3}>
                  <img src="soil.png" alt="" className="rounded-md" />
                </AspectRatio>
                <p className="h-[50px] flex justify-center items-center ">
                  <span className="text-center">Soil, terricolous mosses and plant debris kdjhfuiwehfsdibhflsh fdbhjsfb idsuflb</span>
                </p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter>
      </Card>
      {selectedValue && <p>Selected value: {selectedValue}</p>}
    </div>
  );
}
