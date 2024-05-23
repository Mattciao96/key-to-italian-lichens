// SelectedValue.tsx
"use client";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResetFieldButton, ResetFieldButtonByFun } from "@/features/image-form/components/reset-field-button";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";

export default function SelectedValues({ form, data, inputData, emptyForm, onSubmit }) {
  const values = form.watch();

  
  return (
    <aside className="hidden md:block md:sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="flex -ml-1 justify-around">
        <Button className="w-[140px]" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
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
          {inputData.map((inputLabel) => {
              const value = values[inputLabel];
              if (value !== undefined && value !== null && value !== '') {
                return (
                  <SelectedInputValue
                    key={value}
                    form={form}
                    inputFormLabel={inputLabel}
                    value={value}
                  />
                );
              }
              return null;
            })}
            {data.map((group) => {
              const value = values[group.id];
              if (value !== undefined && value !== null && value !== '') {
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



interface SelectedInputValueProps {
  form: UseFormReturn;
  inputFormLabel: string;
  value: string;
}
/**
 * `SelectedInputValue` is a React component that renders the selected value of an text INPUT field in a form.
 * It displays the label of the field the input belongs to, followed by the inserted value.
 * It also includes a `Reset Button` that allows the user to reset the selected value.
 *
 * @param {Object} props - The properties that define the component's behavior and display.
 * @param {Object} props.form - The form instance provided by `react-hook-form`.
 * @param {string} props.inputFormLabel - The label of the input field.
 *
 * @returns {ReactElement} The `SelectedInputValue` component.
 */
export const SelectedInputValue: React.FC<SelectedInputValueProps> = ({ form, inputFormLabel, value}) =>{


  return (
    <>
      <div key={inputFormLabel} className="w-full py-1 flex justify-end items-center">
        <div className="w-full pl-1 text-sm">
          {inputFormLabel}: {value}
        </div>
        <ResetFieldButtonByFun onClick={(e) => {

        e.preventDefault();
        form.resetField(inputFormLabel, { defaultValue: '' });
      }}>
          <X className="size-4 text-primary"></X>
        </ResetFieldButtonByFun>
      </div>
      <hr className="" />
    </>
  );
}

// SelectedValues.tsx
