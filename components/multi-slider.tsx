"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { Sun, CloudSun, Cloudy } from 'lucide-react'

import { cn } from "@/lib/utils";

// ! originale
/* const MultiSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max]

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  )
}) */

// ! 1.0
/* const MultiSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];
  const columnNumber = props.max - props.min;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-20 w-[75%] grow overflow-hidden rounded-sm bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-background border-2 border-y-primary"></SliderPrimitive.Range>
        <div className="flex absolute h-full w-full z-10">
          <div
            className={`w-[calc(100%/4)] h-full flex justify-center items-center`}
          >
            1
          </div>
          <div
            className={`w-[calc(100%/${columnNumber})] h-full flex justify-center items-center`}
          >
            1
          </div>
          <div
            className={`w-[calc(100%/${columnNumber})] h-full flex justify-center items-center`}
          >
            1
          </div>
          <div
            className={`w-[calc(100%/${columnNumber})] h-full flex justify-center items-center`}
          >
            1
          </div>
          <div
            className={`w-[calc(100%/${columnNumber})] h-full flex justify-center items-center`}
          >
            1
          </div>
        </div>
      </SliderPrimitive.Track>

      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb
            style={{ width: "100%" }}
            className={cn(
              "block h-20 rounded-sm border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              index === 0 ? "border-r-background" : "border-l-background"
            )}
          />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});
 */
// 2. 0
const MultiSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const initialValue = Array.isArray(props.value)
    ? props.value
    : [props.min, props.max];
  const equalValue = initialValue[0] === initialValue[1];
  //const columnNumber = props.max - props.min;
  const columns = [<Sun/>,<CloudSun/>,<CloudSun/>,<CloudSun/>,<Cloudy/>];
  const columnNumber = columns.length;

  // for width
  // for width
  const trackRef = React.useRef(null);
  const thumbRefs = initialValue.map(() => React.createRef());

  React.useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.offsetWidth;
      thumbRefs.forEach((thumbRef) => {
        if (thumbRef.current) {
          thumbRef.current.style.width = `${trackWidth / columnNumber}px`;
        }
      });
    }
  }, [trackRef, thumbRefs]);

  return (
    <SliderPrimitive.Root
      ref={trackRef}
      className={cn(
        "relative flex w-full touch-none select-none items-center hover:cursor-pointer",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-20 w-[75%] grow overflow-hidden rounded-sm bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-background border-2 border-primary"></SliderPrimitive.Range>
        <div className="flex absolute h-full w-full z-10">
          {columns.map((value, index) => (
            <div
              key={index}
              style={{ width: `${100 / columnNumber}%` }}
              className={`first:rounded-l-sm last:rounded-r-sm h-full flex justify-center items-center` }
            >
              {value}
            </div>
          ))}
        </div>
      </SliderPrimitive.Track>

      {initialValue.map((value, index) => (
        <React.Fragment key={index}>
          <SliderPrimitive.Thumb
            ref={thumbRefs[index]}
            className={cn(
              "block z-11 h-20  border-t-2 border-b-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              equalValue
                ? "border-l-2 border-r-2 rounded-sm"
                : index === 0
                ? "border-l-2 rounded-l-sm"
                : "border-r-2 rounded-r-sm"
            )}
           
          />
          
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

MultiSlider.displayName = SliderPrimitive.Root.displayName;

export { MultiSlider };
