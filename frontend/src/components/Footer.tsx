import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center mt-auto py-8 bg-black text-white md:py-10">
      <div className="flex justify-between text-[30px] mb-6 gap-x-5 md:gap-x-8">
        <Link
          to="https://github.com/IgoorSouza"
          target="_blank"
          className="hover:text-amber-400 cursor-pointer"
        >
          <FaGithub />
        </Link>

        <Link
          to="https://www.instagram.com/igor_souzzza/"
          target="_blank"
          className="hover:text-amber-400 cursor-pointer"
        >
          <FaInstagram />
        </Link>

        <Link
          to="https://www.linkedin.com/in/igor-souza-de-castro-04307a278/"
          target="_blank"
          className="hover:text-amber-400 cursor-pointer"
        >
          <FaLinkedin />
        </Link>
      </div>

      <p className="text-[18px]">
        <span className="text-amber-400 font-bold">Costs</span> © 2024
      </p>
    </div>
  );
}
