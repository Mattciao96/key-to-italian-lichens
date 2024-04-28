// SelectedValue.tsx
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ResetFieldButton from "@/features/image-form/components/reset-field-button";
import { Button } from "@/components/ui/button";

export default function SelectedValues({ form, radioData, emptyForm }) {
  const values = form.watch();

  return (
    <aside className="hidden md:sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="flex -ml-1 justify-around">
        <Button className="w-[140px]">Submit</Button>
        <Button
          variant="destructive"
          className="w-[140px]"
          onClick={() => {
            form.reset(emptyForm);
          }}
        >
          Reset fields
        </Button>
      </div>
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className=" pr-[15px]">
            Selected values
          </AccordionTrigger>
          <AccordionContent>
            {radioData.map((group) => {
              const value = values[group.id];
              if (value !== undefined && value !== null) {
                return (
                  <SelectedValue
                    key={group.id}
                    form={form}
                    group={group}
                    value={value}
                  />
                );
              }
              return null;
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export function SelectedValue({ form, group, value }) {
  const getText = () => {
    const item = group.items.find((item) => item.value === value);
    return item?.text || value;
  };

  return (
    <>
      <div key={group.id} className="w-full py-1 flex justify-end items-center">
        <div className="w-full pl-1 text-sm">
          {group.title}: {getText()}
        </div>
        <ResetFieldButton form={form} groupData={group}>
          <X className="size-4 text-primary"></X>
        </ResetFieldButton>
      </div>
      <hr className="" />
    </>
  );
}

// SelectedValues.tsx
