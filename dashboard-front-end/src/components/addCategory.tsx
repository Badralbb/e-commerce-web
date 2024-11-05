import { Check, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { colors } from "@/app/dashboard/addProduct";
import { filters } from "./DashboardSelect";
import { FormValues, sizes } from "@/app/dashboard/addproduct/page";
import { ChangeEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";
type Props = {
  setShowCategory: (value: boolean) => void;
  showCategory: boolean;
  color: boolean;
  setColor: (value: boolean) => void;
  size: boolean;
  setSize: (value: boolean) => void;
  productColor: string[];
  productSize: string[];
  setProductColor: (value: string[]) => void;
  setProductSize: (value: string[]) => void;
  values: FormValues;
  valuesChange: (e: ChangeEvent) => void;
  categoryType: string;
  setCategoryType: (value: string) => void;
  valueError: FormikErrors<FormValues>;
  valueTouched: FormikTouched<FormValues>;
};
export const AddCategory = ({
  valueTouched,
  categoryType,
  valueError,
  setCategoryType,
  setShowCategory,
  showCategory,
  color,
  setColor,
  size,
  setSize,
  productColor,
  productSize,
  setProductSize,
  setProductColor,
  values,
  valuesChange,
}: Props) => {
  const addSizes = (size: string) => {
    const newProductSize = [...productSize];
    newProductSize.push(size);
    setProductSize(newProductSize);
    console.log(productSize);
  };
  const checkSizes = (size: string) => {
    const checkSize = productSize.filter((item) => item !== size);
    setProductSize(checkSize);
  };
  const addSizesAndCheckSizes = (size: string) => {
    const checkedSize = productSize.includes(size);
    if (checkedSize) {
      checkSizes(size);
      return;
    }
    addSizes(size);
  };

  const addColor = (color: string) => {
    const newProductColor = [...productColor];
    newProductColor.push(color);
    setProductColor(newProductColor);
  };
  const checkColor = (color: string) => {
    const includeColor = productColor.filter((item) => item !== color);
    setProductColor(includeColor);
  };
  const addColorAndCheckColor = (color: string) => {
    const checkedColor = productColor.includes(color);

    if (checkedColor) {
      checkColor(color);
    } else {
      addColor(color);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      <div className="bg-[#FFFFFF] rounded-[8px] flex-auto p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2 relative">
          <div>Ерөнхий ангилал</div>

          <div className="">
            <div onClick={() => setShowCategory(true)}>
              <Input
                id="categoryType"
                className="cursor-pointer"
                placeholder="Сонгох"
                value={categoryType}
                onChange={() => ""}
              />
            </div>
            {showCategory && (
              <div className="flex flex-col absolute w-full z-20">
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
        <div className="flex flex-col gap-2 ">
          <div>Дэд ангилал</div>
          <Input
            type="text"
            className="rounded-[8px] px-2 py-[14px] bg-[#F7F7F8]"
            placeholder="Сонгох"
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-6 flex-auto bg-[#FFFFFF] rounded-[8px]">
        <div>Төрөл</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-6 items-center">
            <div>Өнгө</div>
            <div
              onClick={() => {
                setColor(true);
              }}
              className="bg-[#ECEDF0] rounded-full p-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-slate-300"
            >
              <Plus width={15} height={15} />
            </div>

            {color && (
              <div className="relative flex right-0 gap-1 items-center">
                {colors.map((color) => (
                  <div
                    onClick={() => {
                      addColorAndCheckColor(color.color);
                    }}
                    key={color.Value}
                    className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: color.Value }}
                  >
                    {productColor.includes(color.color) && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                ))}
                <Button onClick={() => setColor(false)}>Хаах</Button>
              </div>
            )}
          </div>
          <div className="flex gap-6 items-center">
            <div>Хэмжээ</div>
            <div
              onClick={() => setSize(true)}
              className="bg-[#ECEDF0] rounded-full p-1 cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-slate-300"
            >
              <Plus width={15} height={15} />
            </div>
            {size && (
              <div className="relative flex right-0 gap-1 items-center">
                {sizes.map((size) => (
                  <div
                    onClick={() => {
                      addSizesAndCheckSizes(size);
                    }}
                    key={size}
                    className={`${
                      productSize.includes(size)
                        ? "bg-red-300"
                        : "bg-slate-400 "
                    } cursor-pointer flex items-center justify-center  p-2 rounded-xl`}
                  >
                    {size}
                  </div>
                ))}
                <Button onClick={() => setSize(false)}>Хаах</Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button className="px-4 py-2.5 border-[1px] bg-[#FFFFFF] text-black hover:bg-red-400">
            Төрөл нэмэх
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-auto gap-2 p-6 bg-[#FFFFFF] rounded-[8px]">
        <div>Таг</div>
        <div>
          <Input
            id="productTag"
            type="text"
            placeholder="Таг нэмэх..."
            className="px-2 pt-2 bg-[#F7F7F8]"
            onChange={valuesChange}
            value={values.productTag}
          />
          {valueTouched.productTag && (
            <p className="text-red-500 text-sm pl-2">{valueError.productTag}</p>
          )}
        </div>
        <div className="text-[#5E6166] text-base">
          Санал болгох: Гутал , Цүнх , Эмэгтэй{" "}
        </div>
      </div>
    </div>
  );
};
