import Link from "next/link";
import { Button } from '@/components/ui/button'
const FormTheoryHomePage = () => {
  return (
    <div>
      <h2 className="text-lg mb-6">
        {" "}
        Forms with react hook form and shadcn ui{" "}
      </h2>
      <ul className="space-y-2">
        <li>
          <Button variant='link' asChild>
            <Link href="/forms-theory/radix-slot">Slot (Radix)</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
};
export default FormTheoryHomePage;
