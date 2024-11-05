import { FormValues } from "@/app/dashboard/addproduct/page";
import { Textarea } from "./ui/textarea";
import { ChangeEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";
type Props = {
  values: FormValues;
  valuesChange: (e: ChangeEvent) => void;
  valueError: FormikErrors<FormValues>;
  valueTouched: FormikTouched<FormValues>;
};
export const AddProductName = ({
  values,
  valuesChange,
  valueError,
  valueTouched,
}: Props) => {
  return (
    <div className="p-6 flex flex-col gap-4 bg-[#ffffff] rounded-[8px]">
      <div className="flex flex-col gap-2">
        <div>Бүтээгдэхүүний нэр</div>
        <input
          id="productName"
          onChange={valuesChange}
          value={values.productName}
          className="w-full p-2 bg-[#F7F7F8]  rounded-[8px]"
          type="text"
          placeholder="Нэр"
        />
        {valueTouched.productName && (
          <p className="text-red-500 text-sm pl-2">{valueError.productName}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>Нэмэлт мэдээлэл</div>

        <Textarea
          id="description"
          value={values.description}
          className="w-full"
          onChange={valuesChange}
          placeholder="Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар."
        />
        {valueTouched.description && (
          <p className="text-red-500 text-sm pl-2">{valueError.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>Барааны код</div>
        <input
          id="productCode"
          value={values.productCode !== 0 ? values.productCode : ""}
          onChange={valuesChange}
          className="w-full p-2 bg-[#F7F7F8]  rounded-[8px]"
          type="number"
          placeholder="#12345678"
        />
        {valueTouched.productCode && (
          <p className="text-red-500 text-sm pl-2">{valueError.productCode}</p>
        )}
      </div>
    </div>
  );
};
