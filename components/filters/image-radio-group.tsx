"use client"
import { useState } from "react";
// SHADCN COMPONENTS
import { CircleX } from "lucide-react";
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
import { cn } from "@/lib/utils"

function ImageRadioItem({ itemData}) {
  const { text, value, image } = itemData;
  return (
    <div>
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="w-[300px] flex flex-col gap-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        <AspectRatio ratio={12 / 3}>
          <img src={image} alt="" className="rounded-md" />
        </AspectRatio>
        <p className="h-[42px] flex justify-center items-center ">
          <span className="text-center leading-5">{text}</span>
        </p>
      </Label>
    </div>
  );
}

export function ImageRadioCard({ radioGroupData, className='' }) {
  const { title, description, items } = radioGroupData;
  const [selectedValue, setSelectedValue] = useState(null);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <Card className={cn("max-w-[1000px] relative", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {selectedValue && (
          <Button
            className="absolute rounded-full py-1 px-2  top-2 right-2 bg-transparent hover:bg-transparent"
            onClick={() => setSelectedValue(null)}
          >
            <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          /* defaultValue="card" */
          className="flex flex-wrap justify-center max-w-[1200px] gap-4"
          onValueChange={handleRadioChange}
          value={selectedValue}
        >
          {items.map((item) => (
            <ImageRadioItem key={item.value} itemData={item} />
          ))}
        </RadioGroup>
      </CardContent>
      {/* <CardFooter>
          <Button className="w-full">Continue</Button>
        </CardFooter> */}
    </Card>
  );
}
