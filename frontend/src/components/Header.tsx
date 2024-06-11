import { Link } from "react-router-dom";
import coin from "../assets/coin.png";

export default function Header() {
  return (
    <div className="flex justify-center items-center py-6 bg-black md:justify-between md:items-center md:flex-row md:py-10 md:px-[10%]">
      <img src={coin} className="w-[50px] max-md:mr-5 md:w-[70px]" />

      <nav className="flex flex-col justify-between text-lg text-white max-md:text-center max-md:mt-3 max-md:gap-y-2 md:flex-row md:text-xl md:gap-x-5">
        <Link to="/" className="cursor-pointer hover:text-amber-400">
          Home
        </Link>

        <Link to="/projects" className="cursor-pointer hover:text-amber-400">
          Projetos
        </Link>
      </nav>
    </div>
  );
}
