export default function Header() {
  return (
    <div className="w-screen h-40 flex justify-center bg-black">
      <div className="w-[85%] flex justify-between items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvNjXTIElDAp3nL0OjI78JegsiQj5U08zVkDm0zYKZv2DrWK7i" className="w-[70px] sm:w-[80px]" />

        <div className="w-[300px] sm:w-[350px] flex justify-between text-white">
          <a
            href="/"
            className="text-[20px] cursor-pointer hover:text-amber-400"
          >
            Home
          </a>
          <a
            href="/projects"
            className="text-[20px] cursor-pointer hover:text-amber-400"
          >
            Projetos
          </a>
          <a className="text-[20px] cursor-pointer hover:text-amber-400">
            Empresa
          </a>
          <a className="text-[20px] cursor-pointer hover:text-amber-400">
            Contato
          </a>
        </div>
      </div>
    </div>
  );
}
