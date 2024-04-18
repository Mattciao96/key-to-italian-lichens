// SelectedValue.tsx
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SelectedValues({ form, radioData}) {
  const values = form.watch();

  return (
    <div>
      <h2>Selected Values:</h2>
      {radioData.map((group) => {
        const value = values[group.id.toString()];
        if (value !== undefined) {
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
  const unsetValue = () => {
    form.setValue(group.id.toString(), undefined);
  };

  const getText = () => {
    const item = group.items.find((item) => item.value.toString() === value);
    return item?.text || value;
  };

  return (
    <div key={group.id}>
      <span>
        {group.title}: {getText()}
      </span>

      <Button
        className=" rounded-full bg-transparent hover:bg-transparent"
        onClick={unsetValue}
      >
        <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
      </Button>
    </div>
  );
}

// SelectedValues.tsx
