"use client";
import { useStore } from "@/stores/count-store";
import { Button } from "@/components/ui/button";

export default function Counter() {
  const count = useStore((state) => state.count);

  return (
    <div>
      <h2>Exp2</h2>

      <div className="size-10 flex justify-center items-center">{count}</div>
    </div>
  );
}
