import { filterData } from "@/data/filter-data";
import { RadioGroupImages } from "@/components/filters/image-radio-group2";

export default function Filter() {
  return (
    <div className="border-primary border rounded-md m-10 max-w-[1100px] ">
      {filterData.map((filter) => (

          <RadioGroupImages
            className="my-10 p-10 border-b"
            key={filter.id}
            radioGroupData={filter}
          />

      ))}
    </div>
  );
}
