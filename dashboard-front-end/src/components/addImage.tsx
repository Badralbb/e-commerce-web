import { ImageIcon, Plus } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { FormikTouched } from "formik";
import { FormValues } from "@/app/dashboard/addproduct/page";
type Props = {
  setImage: (value: FileList) => void;
  image: FileList | null;
  uploadImage: string[];
  setUploadImage: (value: string[]) => void;
  create: string;
  setCreate: (value: string) => void;
  valueTouched: FormikTouched<FormValues>;
  imageURLs: string[];
  setImageURLs: (value: string[]) => void;
};
export const AddImage = ({
  image,
  create,
  setImage,
  uploadImage,
  setUploadImage,
  setCreate,
  valueTouched,
  imageURLs,
  setImageURLs,
}: Props) => {
  useEffect(() => {
    const urls: string[] = [];

    Array.from(image ?? []).forEach((file) => {
      const imageURl = URL.createObjectURL(file);
      urls.push(imageURl);
    });

    setImageURLs([...imageURLs, ...urls]);
    setUploadImage(imageURLs);
  }, [image]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setImage(files);
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-[8px] ">
      <div className="mb-4 text-[#000000] text-lg">Бүтээгдэхүүний зураг</div>
      <div className="flex gap-2 items-center">
        <div
          className={`flex-1 rounded-2xl grid place-items-center aspect-square relative ${
            uploadImage.length ? "border-none" : "border-dashed border-2"
          }`}
        >
          <ImageIcon />
          <Image
            className={`${
              imageURLs.length
                ? "block absolute inset-0 w-full h-full rounded-lg"
                : "hidden"
            }`}
            alt="a"
            src={imageURLs[0] || "/"}
            width={100}
            height={100}
          />
        </div>

        <div
          className={`flex-1 rounded-2xl grid aspect-square place-items-center ${
            imageURLs.length > 1 ? "border-none" : "border-dashed border-2"
          } relative`}
        >
          <ImageIcon />
          <Image
            className={`${
              imageURLs.length > 1
                ? "block absolute inset-0 w-full h-full rounded-lg"
                : "hidden"
            }`}
            alt="a"
            src={imageURLs[1] || "/"}
            width={100}
            height={100}
          />
        </div>
        <div
          className={`flex-1 rounded-2xl grid aspect-square place-items-center ${
            imageURLs.length > 2 ? "border-none" : "border-dashed border-2"
          } relative`}
        >
          <ImageIcon />
          <Image
            className={`${
              imageURLs.length > 2
                ? "block absolute w-full h-full inset-0 rounded-lg"
                : "hidden"
            }`}
            alt="a"
            src={imageURLs[2] || "/"}
            width={100}
            height={100}
          />
        </div>

        <div className="flex-1 rounded-2xl grid place-items-center">
          <div className="w-8 h-8 rounded-full bg-[#ECEDF0] grid place-items-center relative">
            <Input
              multiple
              type="file"
              className="opacity-0 absolute z-50 w-full"
              onChange={handleFileChange}
            />
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};
