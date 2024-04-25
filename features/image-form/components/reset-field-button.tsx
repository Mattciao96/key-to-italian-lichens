import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";

const ResetFieldButton = ({ form, groupData, children }) => {
  return (
    <Button
      className=" rounded-full bg-transparent hover:bg-transparent"
      onClick={(e) => {
        console.log(form);

        e.preventDefault();
        form.resetField(groupData.id, { defaultValue: null });
      }}
    >
      {children ? (
        children
      ) : (
        <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
      )}
    </Button>
  );
};

export default ResetFieldButton;
