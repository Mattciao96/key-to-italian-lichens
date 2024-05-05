import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

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

interface ResetFieldButtonByItemNameProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const ResetFieldButtonByFun: React.FC<ResetFieldButtonByItemNameProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button
      className=" rounded-full bg-transparent hover:bg-transparent"
      onClick={onClick}
    >
      {children ? (
        children
      ) : (
        <CircleX className="text-destructive/90 hover:text-destructive"></CircleX>
      )}
    </Button>
  );
};

export { ResetFieldButtonByFun , ResetFieldButton };
