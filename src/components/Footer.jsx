import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="absolute bottom-auto w-screen h-[200px] bg-black">
      <div className="h-full flex flex-col justify-center items-center text-white">
        <div className="w-[150px] flex justify-between text-[30px] mb-10">
          <a className="hover:text-amber-400 cursor-pointer">
            <FaFacebook />
          </a>

          <a className="hover:text-amber-400 cursor-pointer">
            <FaInstagram />
          </a>

          <a className="hover:text-amber-400 cursor-pointer">
            <FaLinkedin />
          </a>
        </div>

        <p className=" text-[18px]">
          <span className="text-amber-400 font-bold">Costs</span> © 2024
        </p>
      </div>
    </div>
  );
}
