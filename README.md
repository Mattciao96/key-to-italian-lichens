To remove background:
https://remove-white-background.imageonline.co/

## SHADCN
To fix errors in combobox:
https://github.com/shadcn-ui/ui/issues/2980

Avoid movements in combobox:
avoidCollisions={avoidCollisions} in popover

### COMMAND
By default command filter is not applied in the first render, so the whole list is shown. To fix this, replace CommandEmpty in ui/command using the following code:
```jsx
const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => {
  const render = useCommandState((state) => state.filtered.count === 0)

  if (!render) return null

  return (
    <div
      ref={ref}
      className={cn('py-6 text-center text-sm', className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  )
})

```

for virtualization:
https://inokawa.github.io/virtua/?path=/story/advanced-with-cmdk--default