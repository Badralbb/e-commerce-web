import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { savedValue } from "./SelectValue";

export type filtType = {
  filt: string;
  value: string;
};
export const filters: filtType[] = [
  { filt: "Малгай", value: "Малгай" },
  { filt: "Усны сав", value: "Усны сав" },
  { filt: "T-shirt", value: "T-shirt" },
  { filt: "Hoodie", value: "Hoodie" },
  { filt: "Тее", value: "Тее" },
  { filt: "Цүнх", value: "Цүнх" },
  { filt: "Бүгд", value: "Бүгд" },
];
export function DashboardSelect() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Сонгох" />
      </SelectTrigger>
      <SelectContent>
        {filters.map((select) => (
          <SelectItem
            onClick={() => savedValue(select.value)}
            value={select.filt}
            className="cursor-pointer"
            key={select.value}
          >
            {select.filt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
