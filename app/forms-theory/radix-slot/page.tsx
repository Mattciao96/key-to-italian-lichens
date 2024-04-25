import { Slot } from "@radix-ui/react-slot";

const RadixSlot = () => {
  return (
    <>
      <h2 className="text-lg">Slot (Radix Primitive)</h2>
      <p>
      A radix {`<Slot>`} Pass all its props to the child<br />
        Shadcn, when you pass asChild props, automatically turns the inner element (or the one they want) to a slot in order to pass promps
        </p>
    </>
  );
};

export default RadixSlot


