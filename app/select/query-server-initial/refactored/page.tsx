import { ComboBox } from "@/features/image-form/components/combobox-server-initial";
import {
  useSearch,
  useFamilySearch,
  useDefaultSortedNames,
} from "@/features/image-form/utils/combobox-utils";
const Page = () => {
  return (
    <div className="h-[100dvh] flex justify-center items-center gap-10">
      <ComboBox useSearch={useSearch} useSortedNames={useDefaultSortedNames} />
      <ComboBox useSearch={useFamilySearch} useSortedNames={useDefaultSortedNames} />
    </div>
  );
};

export default Page;
