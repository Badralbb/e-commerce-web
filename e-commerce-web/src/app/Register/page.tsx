"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormikErrors, useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Toast } from "@radix-ui/react-toast";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  interface FormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }

  const validationSchema = yup.object({
    name: yup.string().min(1).required("Нэр оруулна уу "),
    email: yup
      .string()
      .email("Зөв имэйл хаяг оруулна уу")
      .required("Зөв имэйл хаяг оруулна уу"),
    password: yup
      .string()
      .required("")
      .min(8)
      .matches(RegExp("(.*[a-z].*)"), "Жижиг үсэг орсон байх")
      .matches(RegExp("(.*[A-Z].*)"), "Том үсэг орсон")
      .matches(RegExp("(.*\\d.*)"), "Тоо орсон байх")
      .matches(RegExp('[_!@#$%^&*(),.?":{}|<>]'), "Тэмдэгт орсон байх"),

    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Нууц үг ижил биш байна")
      .required("Нууц үг ижил биш байна"),
  });

  const [Loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues,

    onSubmit: async (values, { resetForm }) => {
      setLoader(true);
      await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({
          userName: values.name,
          password: values.password,
          email: values.email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setLoader(false);
      toast({
        title: "Алдаа гарлаа",
        description: "Backend ээс имэйл давхардсан байвал энд гаргаж өгнө",
        // action: (
        //   <ToastAction className="text-red-500" altText="Try again">
        //     Try again
        //   </ToastAction>
        // ),
      });

      alert("amjiltta nevterlee");
      resetForm();
    },
    validationSchema,
  });
  return (
    <div className="pt-[96px] pb-[374px]">
      <Toaster />
      <form
        className="mx-auto flex flex-col gap-4 w-[334px] text-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="font-semibold">Бүртгүүлэх</div>
        <div className="text-start">
          <Input
            className="h-[36] rounded-[18px]"
            type="email"
            placeholder="Имэйл Хаяг"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && (
            <div className="text-red-500 text-sm pl-2">
              {formik.errors.email}
            </div>
          )}
        </div>
        <Input
          className="h-[36] rounded-[18px]"
          type="name"
          placeholder="Нэр"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && <p>{formik.errors.name}</p>}
        <Input
          className="h-[36] rounded-[18px]"
          type="password"
          placeholder="Нууц үг"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && <p>{formik.errors.password}</p>}
        <div className="text-start">
          <Input
            className="h-[36] rounded-[18px]"
            type="password"
            placeholder="Нууц үг давтах"
            id="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
          />
          {formik.touched.passwordConfirm && (
            <div className="text-red-500 text-sm pl-2">
              {formik.errors.passwordConfirm}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="h-[36] rounded-[18px] bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Үүсгэх
        </Button>
        {Loader && (
          <Image
            src={"/spinner.png"}
            width={50}
            height={50}
            alt="loading"
            className="w-2 h-2 animate-spin"
          />
        )}

        <div className="text-red-500 text-sm pl-2 text-start">
          <div>{formik.errors.password}</div>
        </div>
        <Link
          href={"/Login"}
          className="h-[36] rounded-[18px] bg-white border-2 py-1 border-blue-700 text-blue-700 hover:text-blue-700 hover:bg-black mt-8"
        >
          Нэвтрэх
        </Link>
      </form>
    </div>
  );
}
