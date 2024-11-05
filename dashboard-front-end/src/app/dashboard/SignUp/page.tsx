"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmail = /[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]/.test(email);
  const lengthGreater = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(){}_+:"<>?]/.test(password);

  const isValid =
    lengthGreater &&
    lengthGreater &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialCharacter &&
    validEmail;

  console.log("h: ", { email, password });

  function Submit() {
    fetch("http://localhost:4000/SignUp", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Success");
        
      } else {
        console.log("Error");
      }
    });
  }

  return (
    <div className="flex flex-col vh-100%">
      <div className="flex flex-col mx-auto w-[440px] items-center border-2 rounded-lg my-[100px]">
        <p className="text-[#121316] text-[32px] font-extrabold my-8">
          Бүртгүүлэх
        </p>
        <div className="min-w-[360px] my-3">
          <p className="mb-2">Таны имэйл</p>
          <input
            placeholder="Имэйл"
            className="bg-[#F7F7F8] min-w-[360px] h-[56px] border-2 pl-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <p className={validEmail ? "text-green-600" : "text-red-600"}>
            Имэйл-ээ оруулна уу.
          </p>
        </div>
        <div className="min-w-[360px] my-3">
          <p className="mb-2">Нууц үгээ оруулна уу</p>
          <input
            placeholder="Нэр"
            className="bg-[#F7F7F8] min-w-[360px] h-[56px] border-2 pl-2 rounded-md mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <ul>
            <li className={lengthGreater ? "text-green-600" : "text-red-600"}>
              Үсэг 8-аас их байна.
            </li>
            <li className={hasUpperCase ? "text-green-600" : "text-red-600"}>
              Том үсэг оруулсан байна.
            </li>
            <li className={hasLowerCase ? "text-green-600" : "text-red-600"}>
              Жижиг үсэг оруулсан байна.
            </li>
            <li className={hasNumber ? "text-green-600" : "text-red-600"}>
              Тоо оруулсан байна.
            </li>
            <li
              className={
                hasSpecialCharacter ? "text-green-600" : "text-red-600"
              }
            >
              Тэмдэгт оруулсан байна.
            </li>
          </ul>
        </div>
        <button
          className="flex items-center bg-black text-white min-w-[360px] h-[60px] text-[18px] text-center rounded-md my-3 pr-3 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid}
          onClick={Submit}
        >
          <div className="flex-1 text-center">Дараах</div>
          <FaArrowRightLong className="text-white" />
        </button>
        <div className="min-w-[360px] border-b-2 my-4"></div>

        <button className="flex items-center bg-[#F7F7F8] border-2 rounded-lg min-w-[360px] h-[56px] my-3 justify-center">
          <img
            src="/_CompanyLogo.png"
            alt="logo"
            className="w-[20px] h-[20px] m-[17px]"
          />
          <p>Google-ээр нэвтрэх</p>
        </button>
        <button className="flex items-center bg-[#F7F7F8] border-2 rounded-lg min-w-[360px] h-[56px] my-3 justify-center">
          <img
            src="/windows.png"
            alt="logo"
            className="w-[20px] h-[20px] m-[17px]"
          />
          <p>Microsoft-оор нэвтрэх</p>
        </button>
        <button className="flex items-center bg-[#F7F7F8] border-2 rounded-lg min-w-[360px] h-[56px] my-3 justify-center">
          <img
            src="/apple.png"
            alt="logo"
            className="w-[20px] h-[20px] m-[17px]"
          />
          <p>Apple-ээр нэвтрэх</p>
        </button>
        <div className="min-w-[360px] border-b-2 my-4"></div>
        <div className="flex items-center min-w-[360px] h-[56px] mt-6 mb-10 justify-center">
          <p className="text-[#525252]">Бүртгэлтэй юү?</p>
          <p className="underline ml-2">Нэвтрэх</p>
        </div>
      </div>

      <div className="text-[#a2a2b2] flex mx-auto my-[14px]">
        © 2023 Pinecone
      </div>
    </div>
  );
}

