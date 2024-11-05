import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { error } from "console";
import { Plus } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

import { create } from "domain";
import { Value } from "@radix-ui/react-select";
import { filters } from "@/components/DashboardSelect";

type Props = {
  onClose: () => void;
  loadProduct: () => void;
};
export const colors = [
  { color: "blue", Value: "#4c4efd" },
  { color: "red", Value: "#f23838" },
  { color: "yellow", Value: "#ecb442" },
  { color: "green", Value: "#00ff00" },
  { color: "brown", Value: "#94463c" },
  { color: "black", Value: "#151f2e" },
  { color: "white", Value: "#fffbfc" },
];

export const AddProduct = ({ onClose, loadProduct }: Props) => {
  const updateProduct = async (id: string) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        productName,
        description,
        productId: productCode,
        price,
        qty,
        categoryType: categoryType,
        productTag,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    loadProduct();
  };

  const [color, setColor] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(0);
  const [categoryType, setCategoryType] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [productTag, setProductTag] = useState("");
  const [productColor, setProductColor] = useState<string[]>([]);
  const AddItems = async () => {
    const data = await fetch("http://localhost:4000/products", {
      method: "POST",
      body: JSON.stringify({
        productName,
        description,
        productId: productCode,
        price,
        qty,
        categoryType: categoryType,
        productTag,
        color: productColor,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    reset();
    console.log(data);
  };
  const reset = () => {
    setProductName("");
    setProductCode(0);
    setPrice(0);
    setDescription("");
    setQty(0);
    setProductTag("");
  };
  const addColor = (color: string) => {
    const newProductColor = [...productColor];
    newProductColor.push(color);
    setProductColor(newProductColor);
  };

  return (
    <div className="w-full text-nowrap bg-[#F7F7F8]">
      <div className="flex py-4 bg-[#ffffff] items-center">
        <div className="px-4 hover:cursor-pointer">
          <svg
            onClick={() => {
              onClose();
              loadProduct();
            }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1682 2.48752C13.7598 2.07919 13.1015 2.07919 12.6932 2.48752L5.76816 9.41252C5.44316 9.73752 5.44316 10.2625 5.76816 10.5875L12.6932 17.5125C13.1015 17.9209 13.7598 17.9209 14.1682 17.5125C14.5765 17.1042 14.5765 16.4459 14.1682 16.0375L8.13483 9.99586L14.1765 3.95419C14.5765 3.55419 14.5765 2.88752 14.1682 2.48752Z"
              fill="#121316"
            />
          </svg>
        </div>
        <div className="flex-1">Бүтээгдэхүүн нэмэх</div>
      </div>
      <div className="flex gap-5 px-6 mt-8">
        <div className="flex flex-col gap-6 flex-1">
          <div className="p-6 flex flex-col gap-4 bg-[#ffffff] rounded-[8px]">
            <div className="flex flex-col gap-2">
              <div>Бүтээгдэхүүний нэр</div>
              <input
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                className="w-full p-2 bg-[#F7F7F8]  rounded-[8px]"
                type="text"
                placeholder="Нэр"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Нэмэлт мэдээлэл</div>

              <Textarea
                value={description}
                className="w-full"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>Барааны код</div>
              <input
                value={productCode !== 0 ? productCode : ""}
                onChange={(e) => setProductCode(Number(e.target.value))}
                className="w-full p-2 bg-[#F7F7F8]  rounded-[8px]"
                type="number"
                placeholder="#12345678"
              />
            </div>
          </div>
          <div className="flex gap-4 bg-[#FFFFFF] p-6 rounded-[8px]">
            <div className="flex flex-col gap-2 flex-1">
              <div>Үндсэн үнэ</div>
              <Input
                type="number"
                value={price != 0 ? price : ""}
                min="0"
                max="10000"
                step="1"
                name="Broker_Fees"
                id="broker_fees"
                maxLength={10}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="rounded-[8px] px-2 py-[14px]"
                placeholder="Үндсэн үнэ"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div>Үлдэгдэл тоо ширхэг</div>
              <Input
                onChange={(e) => setQty(Number(e.target.value))}
                type="number"
                className="rounded-[8px] px-2 py-[14px]"
                placeholder="Үлдэгдэл тоо ширхэг"
                value={qty !== 0 ? qty : ""}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#FFFFFF] rounded-[8px] p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>Ерөнхий ангилал</div>

              <div className="relative">
                <div onClick={() => setShowCategory(true)}>
                  <Input
                    className="cursor-pointer"
                    placeholder="Сонгох"
                    value={categoryType}
                    onChange={() => ""}
                  />
                </div>
                {showCategory && (
                  <div className="flex flex-cxol absolute w-full">
                    {filters.map((select) => (
                      <div
                        onClick={() => {
                          setCategoryType(select.value);
                          setShowCategory(false);
                        }}
                        className="cursor-pointer p-4 bg-[#F7F7F8] rounded-lg border-[2px]"
                        key={select.value}
                      >
                        {select.filt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Дэд ангилал</div>
              <Input
                type="text"
                className="rounded-[8px] px-2 py-[14px] bg-[#F7F7F8]"
                placeholder="Сонгох"
              />
            </div>
          </div>
          <div className="p-6 flex flex-col gap-6 bg-[#FFFFFF] rounded-[8px]">
            <div>Төрөл</div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-6 items-center relative">
                <div>Өнгө</div>
                <div
                  onClick={() => {
                    setColor(true);
                  }}
                  className="bg-[#ECEDF0] rounded-full p-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-slate-300"
                >
                  <Plus width={15} height={15} />
                </div>
                <div></div>
                {color && (
                  <div className="absolute flex right-0 gap-1 items-center">
                    {colors.map((color) => (
                      <div
                        onClick={() => addColor(color.color)}
                        key={color.Value}
                        className="w-6 h-6 rounded-full cursor-pointer"
                        style={{ backgroundColor: color.Value }}
                      ></div>
                    ))}
                    <Button onClick={() => setColor(false)}>Хаах</Button>
                  </div>
                )}
              </div>
              <div className="flex gap-6 items-center">
                <div>Хэмжээ</div>
                <div className="bg-[#ECEDF0] rounded-full p-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-slate-300">
                  <Plus width={15} height={15} />
                </div>
              </div>
            </div>
            <div>
              <Button className="px-4 py-2.5 border-[1px] bg-[#FFFFFF] text-black hover:bg-red-400">
                Төрөл нэмэх
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-6 bg-[#FFFFFF] rounded-[8px]">
            <div>Таг</div>
            <div>
              <Input
                type="text"
                placeholder="Таг нэмэх..."
                className="px-2 pt-2 bg-[#F7F7F8]"
                onChange={(e) => setProductTag(e.target.value)}
                value={productTag}
              />
            </div>
            <div className="text-[#5E6166] text-base">
              Санал болгох: Гутал , Цүнх , Эмэгтэй{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6 px-6 mt-[21px]">
        <Button className="bg-[#FFFFFF] text-black border-[1px]">Ноорог</Button>
        <Button onClick={AddItems}>Нийтлэх</Button>
      </div>
    </div>
  );
};
