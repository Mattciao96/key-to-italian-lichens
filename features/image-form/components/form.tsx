"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import RadioImageGroupForm from "@/features/image-form/components/radio-image-group";
import SelectedValues from "@/features/image-form/components/selected-values";
import SelectedValuesMobile from "@/features/image-form/components/selected-values-mobile";
import SelectForm from "@/features/image-form/components/select-form";
//import SelectForm from "@/features/image-form/components/select-form-dialog";
import { MultiRangeForm } from "./multi-slider-test";

import { filterData } from "@/features/image-form/data/filter-data";
import { selectData } from "@/features/image-form/data/select-data";
import { selectDataArea } from "@/features/image-form/data/select-data-area";
//import { rangeData } from "@/features/image-form/data/range-data";
import { rangeData } from "@/features/image-form/data/range-data-min-max";
import { rarityData } from "@/features/image-form/data/rarity-data";
// for combobox
import { ComboBox } from "@/features/image-form/components/combobox-server-initial-form";
import {
  useSearch,
  useFamilySearch,
  useDefaultSortedNames,
} from "@/features/image-form/utils/combobox-utils";


const radioData = filterData;

const FormSchema = z.object({
  "4": z.optional(z.enum(["1", "2", "3"])),
  "26": z.optional(z.enum(["1", "2"])),
  "45": z.optional(z.enum(["1", "2"])),
  "53": z.optional(z.enum(["1", "2"])),
  "11": z.optional(z.enum(["1", "2"])),
  "7": z.optional(z.enum(["1", "2"])),
  "27": z.optional(z.enum(["1", "2"])),
  "41": z.optional(z.enum(["1", "2"])),
  "23": z.optional(z.enum(["1", "2"])),
  "33": z.optional(z.enum(["1", "2"])),
  "46": z.optional(z.enum(["1", "2"])),
  "37": z.optional(z.enum(["1", "2"])),
  "8": z.optional(z.enum(["1", "2"])),
  "34": z.optional(z.enum(["1", "2"])),
  "35": z.optional(z.enum(["1", "2"])),
  "52": z.optional(z.enum(["1", "2"])),
  "36": z.optional(z.enum(["1", "2"])),
  "42": z.optional(z.enum(["1", "2", "3"])),
  "12": z.optional(z.enum(["1", "3", "4", "5"])),
  subst: z.optional(z.string()),
  photo: z.optional(z.string()),
  growth: z.optional(z.string()),
  srw: z.optional(z.string()),
  repro: z.optional(z.string()),
  oc: z.optional(z.string()),
  coast: z.optional(z.string()),
  paras: z.optional(z.string()),
  metal: z.optional(z.string()),
  pion: z.optional(z.string()),
  genus: z.optional(z.string()),
  family: z.optional(z.string()),
  PH1: z.optional(z.string()),
  PH2: z.optional(z.string()),
  LIG1: z.optional(z.string()),
  LIG2: z.optional(z.string()),
  ARID1: z.optional(z.string()),
  ARID2: z.optional(z.string()),
  EUTRO1: z.optional(z.string()),
  EUTRO2: z.optional(z.string()),
  PF1: z.optional(z.string()),
  PF2: z.optional(z.string()),
  ALT1: z.optional(z.string()),
  ALT2: z.optional(z.string()),
  area: z.optional(z.string()),
  region: z.optional(z.string()),
  ecoregion: z.optional(z.string()),
  COMM1: z.optional(z.string()),
  COMM2: z.optional(z.string()),
});

const emptyForm = {
  "4": undefined,
  "26": null,
  "45": null,
  "53": null,
  "11": null,
  "7": null,
  "27": null,
  "41": null,
  "23": null,
  "33": null,
  "46": null,
  "37": null,
  "8": null,
  "34": null,
  "35": null,
  "52": null,
  "36": null,
  "42": null,
  "12": null,
  subst: null,
  photo: null,
  growth: null,
  srw: null,
  oc: null,
  coast: null,

  paras: null,
  metal: undefined,
  pion: null,
  genus: "",
  family: "",
  PH1: null,
  PH2: null,
  LIG1: null,
  LIG2: null,
  ARID1: null,
  ARID2: null,
  EUTRO1: null,
  EUTRO2: null,
  PF1: null,
  PF2: null,
  ALT1: null,
  ALT2: null,
  area: null,
  region: null,
  ecoregion: null,
  COMM1: null,
  COMM2: null,
};
const inputData = ["genus", "family"];
const fullData = [...selectDataArea, ...rarityData, ...radioData, ...selectData, ...rangeData];
//console.log(radioData);
//console.log(fullData);

export default function RadioGroupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      /*  area: "italy",
      region: "ITA",
      ecoregion: "12", */
    },
  });

  const onSubmit = async (data) => {
    // Send the form data to the API
    console.log("fa qualcosa");
    console.log(JSON.stringify(data));
    
    const response = await fetch("https://italic.units.it/api/v1/key-filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // Navigate to /response page with the API response
    localStorage.setItem("result", JSON.stringify(result));
    router.push("/key");
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-teal-100 shadow-bottom p-2">
        <h1 className="pl-10 text-xl ">Key to Italian Lichens</h1>
      </div>
      <Form {...form}>
        <div className="px-2 relative md:grid md:grid-cols-[1fr_300px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* for area */}
            {selectDataArea.map((data) => (
              <SelectForm key={data.id} form={form} data={data}></SelectForm>
            ))}
            {/* for rarity */}
            {rarityData.map((data) => (
              <SelectForm key={data.id} form={form} data={data}></SelectForm>
            ))}

            <div className="flex justify-around flex-wrap gap-4">
              <ComboBox
                text={{
                  labelText: "genus",
                  triggerText: "Select a Genus",
                  searchText: "Insert at least one character",
                  loadingText: "Searching...",
                  errorText: "Error loading data",
                  noResultsText: "No genera found",
                }}
                form={form}
                useSearch={useSearch}
                useSortedNames={useDefaultSortedNames}
              />
              <ComboBox
                text={{
                  labelText: "family",
                  triggerText: "Select a family",
                  searchText: "",
                  loadingText: "Searching...",
                  errorText: "Error loading data",
                  noResultsText: "No families found",
                }}
                form={form}
                useSearch={useFamilySearch}
                useSortedNames={useDefaultSortedNames}
              />
            </div>

            {/* <div className="flex justify-around flex-wrap gap-4">
              {rangeData.map((data) => (
                <MultiRangeForm key={data.id} form={form} data={data} />
              ))}
            </div> */}

            {/* try selectdata */}
            {rangeData.map((data) => (
              <SelectForm key={data.id} form={form} data={data}></SelectForm>
            ))}
            {selectData.map((data) => (
              <SelectForm key={data.id} form={form} data={data}></SelectForm>
            ))}

            {radioData.map((groupData) => (
              <RadioImageGroupForm
                key={groupData.id}
                form={form}
                groupData={groupData}
              />
            ))}

            <Button type="submit">Submito</Button>
          </form>
          {/* <div className="none md:sticky  sticky top-10 pt-10 h-screen overflow-y-auto border-l border-border"> */}
          {/*  <div className="none md:fixed w-[290px] md:top-10 md:right-0 pt-10 h-screen overflow-y-auto"> */}
          <SelectedValues
            form={form}
            data={fullData}
            inputData={inputData}
            emptyForm={emptyForm}
            onSubmit={onSubmit}
          />
          <SelectedValuesMobile
            form={form}
            data={fullData}
            inputData={inputData}
            emptyForm={emptyForm}
            onSubmit={onSubmit}
          />
        </div>
      </Form>
    </>
  );
}
