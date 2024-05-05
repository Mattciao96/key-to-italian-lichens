"use client";
import { useEffect } from "react";
import RadioImageItem from "@/features/image-form/components/radio-image-item";
import { ResetFieldButton } from "@/features/image-form/components/reset-field-button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

/**
 * With form.watch it check if the form item should be rendered
 */
export default function RadioImageGroupForm({ form, groupData }) {
  const watchDependValue = groupData.depend
    ? form.watch(groupData.depend.id)
    : undefined;

  useEffect(() => {
    // 2: if the depend item is not selected, hide the group
    if (groupData.depend && watchDependValue !== groupData.depend.item) {
      // 3: remove the value from the form only if is not already undefined (otherwise it wil trigger infinite rerenders)
      if (form.getValues(groupData.id)) {
        form.resetField(groupData.id);
      }
    }
  }, [watchDependValue, form, groupData]);

  if (groupData.depend && watchDependValue !== groupData.depend.item) {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name={groupData.id}
      render={({ field }) => (
        <FormItem className="relative space-y-3">
          <FormLabel>{groupData.title}</FormLabel>

          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value ? field.value : ""}
              className="flex flex-row flex-wrap justify-center space-y-1"
            >
              {groupData.items.map((item) => (
                <RadioImageItem
                  key={item.value}
                  groupId={groupData.id}
                  item={item}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
          {field.value && (
            <FormItem className="absolute py-1 px-2  -top-2 right-2 ">
              <FormControl>
                <ResetFieldButton
                  form={form}
                  groupData={groupData}
                ></ResetFieldButton>
              </FormControl>
            </FormItem>
          )}
        </FormItem>
      )}
    />
  );
}
