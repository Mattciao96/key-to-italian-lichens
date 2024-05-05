import { ComboBox } from "@/features/image-form/components/combobox-server-initial";
import {
  useSearch,
  useFamilySearch,
  useDefaultSortedNames,
} from "@/features/image-form/utils/combobox-utils";
const Page = () => {
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center gap-10">
      <ComboBox
        text={{
          labelText: 'Genus',
          triggerText: "Select a Genus",
          searchText: "Insert at least one character",
          loadingText: "Searching...",
          errorText: "Error loading data",
          noResultsText: "No genera found",
        }}
        useSearch={useSearch}
        useSortedNames={useDefaultSortedNames}
      />
      <ComboBox
        text={{
          labelText: 'Family',
          triggerText: "Select a family",
          searchText: "",
          loadingText: "Searching...",
          errorText: "Error loading data",
          noResultsText: "No families found",
        }}
        useSearch={useFamilySearch}
        useSortedNames={useDefaultSortedNames}
      />
    </div>
  );
};

export default Page;
