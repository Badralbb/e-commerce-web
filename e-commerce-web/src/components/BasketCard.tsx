"use client";

import Image from "next/image";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { productItem } from "./types";

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
];
export const filtersArray = [
  "Малгай",
  "Усны сав",
  "T-shirt",
  "Hoodie",
  "Тее",
  "Цүнх",
];
export const sizes: string[] = ["Free", "S", "M", "L", "XL", "2XL", "3Xl"];
export const BasketCard = ({
  cardItems,
  getShoppingCart,
  uploadShoppingCart,
  setUploadShoppingCart,
  index,
}: {
  cardItems: productItem;
  getShoppingCart: () => void;
  uploadShoppingCart: productItem[];
  setUploadShoppingCart: (value: productItem[]) => void;
  index: number;
}) => {
  const addQuintity = () => {
    const basketProducts = JSON.parse(
      localStorage.getItem("basketProducts") || "[]"
    );
    basketProducts[index].productCount++;
    localStorage.setItem("basketProducts", JSON.stringify(basketProducts));
    setUploadShoppingCart(basketProducts);
  };
  const minusQuintity = () => {
    const basketProducts = JSON.parse(
      localStorage.getItem("basketProducts") || "[]"
    );
    basketProducts[index].productCount--;
    localStorage.setItem("basketProducts", JSON.stringify(basketProducts));
    setUploadShoppingCart(basketProducts);
  };
  const deleteShoppingCart = async () => {
    let basketProducts = JSON.parse(
      localStorage.getItem("basketProducts") || "[]"
    );

    basketProducts = basketProducts.filter(
      (item: productItem) => item.productId !== basketProducts[index].productId
    );
    localStorage.setItem("basketProducts", JSON.stringify(basketProducts));
    setUploadShoppingCart(basketProducts);
    getShoppingCart(); // dahin render hiij uldsen baraag harah
  };

  return (
    <div className="w-[574px] h-[132px] flex relative group border-[1px] rounded-2xl py-[16px] pl-[16] gap-[24px]">
      <div className="rounded-2xl aspect-auto bg-slate-300 overflow-hidden relative border-[1px] h-[100px] w-[100px] left-[16px]">
        <Image
          alt="zurag"
          src={cardItems?.images[0] || ""}
          width={100}
          height={100}
          className="bg-slate-50 absolute"
        />
      </div>
      <div className="flex flex-col gap-[8px] w-[354px]">
        <div></div>
        <div>{cardItems.productName}</div>
        <div className="flex gap-3">
          <div onClick={() => cardItems.productCount != 1 && minusQuintity()}>
            <CircleMinus />
          </div>
          <div>{cardItems.productCount}</div>
          <div onClick={() => addQuintity()}>
            <CirclePlus />
          </div>
        </div>
        <div className="font-bold">
          {cardItems && cardItems.price * cardItems.productCount}
        </div>
      </div>
      <div className="left-[24px]">
        <Trash2
          onClick={deleteShoppingCart}
          className="text-slate-600 h-[40px] w-[40px] p-[8px] border-0"
        />
      </div>
    </div>
  );
};
