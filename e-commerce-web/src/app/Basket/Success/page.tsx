"use client";

import basketProducts from "@/app/datas.json";

import * as React from "react";
import { CircleCheckBig } from "lucide-react";

export default function Home() {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [counting, setCounting] = React.useState(0);

  let sum = 0;
  basketProducts.forEach((product) => {
    sum = sum + product.price;
  });

  return (
    <div className="max-w-[1040px] mx-auto bg-[#F7F7F8] min-h-screen pt-[168px]">
      <div className="w-[374px] h-[185px] bg-white  mx-auto rounded-2xl px-[7px] py-[56px] ">
        <div className="w-[360px] h-[73px] flex flex-col gap-[17px]">
          <div className="ml-[163px]">
            <CircleCheckBig className="text-[#2563EB]" />
          </div>
          <div className="text-center">Захиалга амжилттай баталгаажлаа.</div>
        </div>
      </div>
    </div>
  );
}
