"use client";

import { filters, sizes } from "@/components/BasketCard";
import { Card, ProductType } from "@/components/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export default function Home() {
  const [cardList, setCardList] = useState<ProductType[]>([]);
  const [categoryType, setCategoryType] = useState("");
  const [sizee, setSizee] = useState("");

  const productList = async () => {
    const response = await fetch(
      "http://localhost:4000/products?fromDate=undefined&toDate=undefined"
    );
    const data = await response.json();
    setCardList(data);
  };

  const filtproduct = async () => {
    const response = await fetch(
      `http://localhost:4000/category?categoryType=${categoryType}&size=${sizee}`
    );
    const data = await response.json();
    setCardList(data);
  };
  useEffect(() => {
    productList();
  }, []);

  const typeFilter = (value: string) => {
    if (categoryType === value) {
      setCategoryType("");
    } else {
      setCategoryType(value);
    }
  };

  useEffect(() => {
    filtproduct();
  }, [categoryType, sizee]);

  const sizeFilter = (value: string) => {
    if (sizee === value) {
      setSizee("");
    } else {
      setSizee(value);
    }
  };
  return (
    <div className="max-w-[1039px] mx-auto flex gap-[20px] pb-[100px] pt-[52px]">
      <div className="max-w-[245px] w-full flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="font-bold">Ангилал</div>
          {filters.map((filter) => (
            <label
              key={filter.filt}
              className="flex gap-2 items-center select-none"
            >
              <Checkbox
                checked={filter.value === categoryType}
                onClick={() => {
                  typeFilter(filter.value);
                }}
              />
              <div>{filter.filt}</div>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-bold">Хэмжээ</div>
          {sizes.map((size) => (
            <label key={size} className="flex gap-2 items-center">
              <Checkbox
                onClick={() => {
                  sizeFilter(size);
                }}
                checked={size === sizee}
              />
              <div>{size}</div>
            </label>
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-x-[21px] gap-y-12">
        {cardList.map((cardItems, index) => (
          <Card key={cardItems?._id} cardItems={cardItems} index={index} />
        ))}
      </div>
    </div>
  );
}
