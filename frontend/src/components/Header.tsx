import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import coin from "../assets/coin.png";
import arrow from "../assets/arrow.svg";

export default function Header() {
  const [showNav, setShowNav] = useState<boolean>(false);
  const { authenticating, authData, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center pt-6 text-lg bg-black max-md:flex-col md:justify-between max-md:pb-4 md:py-10 md:px-[10%] md:text-xl">
      <div className="flex justify-center items-center md:max-w-[60%]">
        <img
          src={coin}
          className={`w-[50px] md:w-[70px] ${authData && "mr-5"}`}
        />

        <p
          className={`text-center text-white ${
            !authData?.name?.includes(" ") && "break-all"
          }`}
        >
          {authData?.name}
        </p>
      </div>

      {!authenticating && (
        <>
          <div
            className="w-full md:hidden"
            onClick={() => setShowNav(!showNav)}
          >
            <img
              src={arrow}
              className={`mt-2 mx-auto ${!showNav && "rotate-180"}`}
            />
          </div>

          <div
            className={`flex flex-col justify-between w-3/4 text-white max-md:text-center max-md:mt-3 max-md:gap-y-1 md:flex-row md:w-[20%] md:gap-x-8 ${
              showNav ? "block" : "max-md:hidden"
            }`}
          >
            <Link
              to="/"
              className="cursor-pointer max-md:py-2 max-md:border-b-[2px] hover:text-amber-400"
            >
              Home
            </Link>

            {authData ? (
              <>
                <Link
                  to="/projects"
                  className="cursor-pointer max-md:py-2 max-md:border-b-[2px] hover:text-amber-400"
                >
                  Projetos
                </Link>

                <p
                  className="cursor-pointer max-md:py-2 hover:text-amber-400"
                  onClick={logout}
                >
                  Sair
                </p>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="cursor-pointer max-md:py-2 max-md:border-b-[2px] hover:text-amber-400"
                >
                  Entrar
                </Link>

                <Link
                  to="/register"
                  className="cursor-pointer max-md:py-2 hover:text-amber-400"
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
