import { Link } from "react-router-dom";
import savings from "../assets/savings.svg";

export default function MainPage() {
  return (
    <div className="w-[90%] mx-auto my-12 text-center md:my-20">
      <h1 className="text-3xl font-bold mb-6 md:text-5xl">
        Bem-vindo ao <span className="px-2 bg-black text-amber-400">Costs</span>
      </h1>

      <p className="text-[16px] sm:text-[18px] text-zinc-400 mb-6">
        Comece a gerenciar os seus projetos agora mesmo!
      </p>

      <Link to="/new">
        <button className="bg-black text-amber-400 px-3 py-2 text-[18px] mb-8">
          Criar projeto
        </button>
      </Link>

      <img src={savings} className="w-[250px] mx-auto md:w-[300px]" />
    </div>
  );
}
