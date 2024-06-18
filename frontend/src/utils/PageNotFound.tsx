import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="text-center mt-6 md:mt-10">
      <h1 className="text-2xl mb-4 md:text-3xl md:mb-6">
        Página não encontrada.
      </h1>
      <Link to="/" className="bg-black text-amber-400 px-3 py-2 text-[18px]">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
