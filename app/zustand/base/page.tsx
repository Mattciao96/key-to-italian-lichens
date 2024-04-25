"use client";
import { useStore } from "@/stores/count-store";
import { Button } from "@/components/ui/button";

export default function Counter() {
  const { count, inc, dec, reset } = useStore();

  return (
    <div className="flex gap-2 items-center">
      <Button className="w-24" onClick={dec}>
        one down
      </Button>
      <div className="size-10 flex justify-center items-center">{count}</div>
      <Button className="w-24" onClick={inc}>
        one up
      </Button>
      <Button className="w-24" onClick={reset}>
        reset
      </Button>
    </div>
  );
}
