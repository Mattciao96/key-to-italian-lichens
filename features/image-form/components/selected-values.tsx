// SelectedValue.tsx
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import ResetFieldButton from "@/features/image-form/components/reset-field-button";

export default function SelectedValues({ form, radioData }) {
  const values = form.watch();

  return (
    <div>
      <h2>Selected Values:</h2>
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
    </div>
  );
}

export function SelectedValue({ form, group, value }) {
  const getText = () => {
    const item = group.items.find((item) => item.value === value);
    return item?.text || value;
  };

  return (
    <div key={group.id} className="w-full flex justify-end items-center">
      <div className="p-2 w-full">
        {group.title}: {getText()}
      </div>
      <ResetFieldButton form={form} groupData={group}/>
    </div>
  );
}

// SelectedValues.tsx
