"use client";
import Image from "next/image";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-black">
      <div className="bg-black text-white px-6 max-w-[1440px] mx-auto">
        <div className="flex justify-between pt-16 items-center">
          <div className="w-[41px] h-[35px]">
            <Image
              width={41}
              height={35}
              alt={"logo"}
              src={"/Pinecone@2x.png"}
            />
          </div>
          <div className="flex gap-10">
            <div className="flex items-center gap-4">
              <div className="border-[#FFFFFF2A] border-solid border-[1px] rounded-full w-8 h-8 flex items-center justify-center text-slate-600">
                <FiPhone className="text-white" />
              </div>
              <p>(976) 7007-1234</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="border-[#FFFFFF2A] border-solid border-[1px] rounded-full w-8 h-8 flex items-center justify-center">
                <IoMailOutline />
              </div>
              <Link href="www.ecommerce.mn">contact@ecommerce.mn</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center h-[1.5px] bg-[#FFFFFF1A] my-11"></div>

        <div className="flex justify-between items-center pb-16">
          <div className="text-[14px]">© 2024 Ecommerce MN</div>
          <div className="flex gap-7">
            <Link href="https://www.facebook.com/">
              <FaFacebook />
            </Link>
            <Link href="https://www.instagram.com/">
              <IoLogoInstagram />
            </Link>
            <Link href="https://x.com/">
              <FaTwitter />
            </Link>
            <Link href="https://mn.linkedin.com/">
              <IoLogoLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
