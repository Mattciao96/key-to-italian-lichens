import { List, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectedValue } from "@/features/image-form/components/selected-values";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
export default function SelectedValuesMobile({ form, data, emptyForm }) {
  const values = form.watch();
  return (
    <div className="block md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border ">
      <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
      <Button
              
              variant="ghost"
              type="button"
              className="h-full py-0 inline-flex flex-col items-center justify-center gap-1 px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
          <MousePointer2 className="pt-1 -pb-1"></MousePointer2>
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Submit
          </span>
        </Button>

        <Drawer>
          <DrawerTrigger asChild>
            <Button
              
              variant="ghost"
              type="button"
              className="h-full py-0 inline-flex flex-col items-center justify-center gap-1 px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600"
            >
             
                <List></List>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  See Filters
                </span>
              
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Selected filters</DrawerTitle>
                {/*  <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription> */}
              </DrawerHeader>
              <div className="min-h-[60vh] max-h-[60vh] overflow-y-scroll">
                {data.map((group) => {
                  const value = values[group.id];
                  if (value !== undefined && value !== null && value !== '') {
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
              <DrawerFooter className="pt-8">
                <Button
                  variant="destructive"
                  onClick={() => {
                    form.reset(emptyForm);
                  }}
                >
                  Reset Filters
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
