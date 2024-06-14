import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import savings from "../assets/savings.svg";

export default function MainPage() {
  const { authData } = useContext(AuthContext);

  return (
    <div className="w-[90%] mx-auto my-12 text-center md:my-20">
      <h1 className="text-3xl font-bold mb-6 md:text-5xl">
        Bem-vindo ao <span className="px-2 bg-black text-amber-400">Costs</span>
      </h1>

      <p className="text-[16px] sm:text-[18px] text-zinc-400 mb-6">
        Comece a gerenciar os seus projetos agora mesmo!
      </p>

      {authData ? (
        <Link
          to="/projects/new"
          className="bg-black text-amber-400 px-3 py-2 text-[18px]"
        >
          Criar projeto
        </Link>
      ) : (
        <div className="flex justify-center items-center gap-x-4">
          <Link
            to="login"
            className="bg-black text-amber-400 px-3 py-2 text-[18px]"
          >
            Entrar
          </Link>
          <span className="text-[18px]">ou</span>
          <Link
            to="register"
            className="bg-black text-amber-400 px-3 py-2 text-[18px]"
          >
            Criar conta
          </Link>
        </div>
      )}

      <img src={savings} className="w-[250px] mt-8 mx-auto md:w-[300px]" />
    </div>
  );
}
