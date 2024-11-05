import { FormValues } from "@/app/dashboard/addproduct/page";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { FormikErrors, FormikTouched } from "formik";
type Props = {
  values: FormValues;
  valuesChange: (e: ChangeEvent) => void;
  valueError: FormikErrors<FormValues>;
  valueTouched: FormikTouched<FormValues>;
};
export const AddPrice = ({
  values,
  valuesChange,
  valueError,
  valueTouched,
}: Props) => {
  return (
    <div className="flex gap-4 bg-[#FFFFFF] p-6 rounded-[8px]">
      <div className="flex flex-col gap-2 flex-1">
        <div>Үндсэн үнэ</div>
        <Input
          type="number"
          value={values.price != 0 ? values.price : ""}
          step="1"
          min={0}
          id="price"
          maxLength={10}
          onChange={valuesChange}
          className="rounded-[8px] px-2 py-[14px]"
          placeholder="Үндсэн үнэ"
        />
        {valueError.price && valueTouched.price && (
          <p className="text-red-500 text-sm pl-2">{valueError.price}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div>Үлдэгдэл тоо ширхэг</div>
        <Input
          id="qty"
          onChange={valuesChange}
          type="number"
          className="rounded-[8px] px-2 py-[14px]"
          placeholder="Үлдэгдэл тоо ширхэг"
          value={values.qty !== 0 ? values.qty : ""}
        />
        {valueError.qty && valueTouched.qty && (
          <p className="text-red-500 text-sm pl-2">{valueError.qty}</p>
        )}
      </div>
    </div>
  );
};
