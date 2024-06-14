import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import coin from "../assets/coin.png";

export default function Header() {
  const { authData } = useContext(AuthContext);

  return (
    <nav className="flex justify-center items-center py-6 text-lg text-white bg-black md:flex-row md:justify-between md:items-center md:py-10 md:px-[10%] md:text-xl">
      <div className="flex items-center max-w-[40%] max-md:flex-col max-md:mr-8 md:max-w-[60%]">
        <img src={coin} className="w-[50px] md:w-[70px] md:mr-5" />
        {authData && <p className="text-center">{authData.name}</p>}
      </div>

      <div className="flex flex-col justify-between max-md:text-center max-md:mt-3 max-md:gap-y-1 md:flex-row md:gap-x-8">
        <Link to="/" className="cursor-pointer hover:text-amber-400">
          Home
        </Link>

        {authData ? (
          <Link to="/projects" className="cursor-pointer hover:text-amber-400">
            Projetos
          </Link>
        ) : (
          <>
            <Link to="/login" className="cursor-pointer hover:text-amber-400">
              Entrar
            </Link>

            <Link
              to="/register"
              className="cursor-pointer hover:text-amber-400"
            >
              Criar conta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
