import { filterData } from "@/data/filter-data";
import { ImageRadioCard } from "@/components/filters/image-radio-group";

export default function Filter() {
  return (
    <div className="p-10">
      {filterData.map((filter) => (
        
        <ImageRadioCard className='my-10' key={filter.title} radioGroupData={filter} />
      ))}
    </div>
  );
}
