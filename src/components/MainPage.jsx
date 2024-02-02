export default function MainPage() {
  return (
    <div className="flex flex-col items-center my-20">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">
        Bem-vindo ao <span className="bg-black text-amber-400 px-2">Costs</span>
      </h1>

      <p className="text-[16px] sm:text-[18px] text-zinc-400 mb-6">
        Comece a gerenciar os seus projetos agora mesmo!
      </p>

      <a href="/new">
        <button className="bg-black text-amber-400 px-3 py-2 text-[18px] mb-8">
          Criar projeto
        </button>
      </a>

      <img src="savings.svg" className="w-[300px]" />
    </div>
  );
}
