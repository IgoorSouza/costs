import { api } from "../provider";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  function deleteProject(projectId) {
    api.delete(`projects/${projectId}`).then(window.location.reload());
  }

  return (
    <div className="flex flex-col my-10 w-[80%] m-auto">
      <div className="w-full flex justify-between m-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Meus Projetos</h1>
        <a href="/new">
          <button className="bg-black text-white hover:text-amber-400 px-3 py-2 text-[18px] mb-8">
            Criar projeto
          </button>
        </a>
      </div>

      {projects.length === 0 && (
        <div className="m-auto">
          <h2 className="text-xl md:text-2xl">Nenhum projeto registrado.</h2>
        </div>
      )}

      <div className="flex flex-col items-center md:items-start md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {projects.map((project, index) => {
          return (
            <div
              className="w-[300px] p-3 mb-5 md:mb-0 border-[1px] border-zinc-400 rounded-md justify-self-center"
              key={index}
            >
              <h2 className="bg-black text-amber-400 text-2xl font-bold p-2 mb-5">
                {project.name}
              </h2>

              <p className="text-zinc-500 mb-3">
                <span className="font-bold">Orçamento: </span>
                R${project.budget}
              </p>

              <p className="text-zinc-500 mb-5 flex items-center">
                <span
                  className={
                    project.category === "Desenvolvimento"
                      ? "block w-[12px] h-[12px] rounded-[50%] bg-[#a0e7e5] mr-1"
                      : project.category === "Design"
                      ? "block w-[12px] h-[12px] rounded-[50%] bg-[#b4f8c8] mr-1"
                      : project.category === "Infra"
                      ? "block w-[12px] h-[12px] rounded-[50%] bg-[#ffaebc] mr-1"
                      : project.category === "Planejamento" &&
                        "block w-[12px] h-[12px] rounded-[50%] bg-[#fbe7c6] mr-1"
                  }
                />
                {project.category}
              </p>

              <div className="w-56 flex justify-around">
                <a href={`/project/${project.id}`}>
                  <button className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]">
                    <FaPencil className="mr-2" /> Editar
                  </button>
                </a>

                <button
                  className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]"
                  onClick={() => setConfirmation(index)}
                >
                  <FaRegTrashAlt className="mr-2" /> Excluir
                </button>
              </div>

              {confirmation === projects.indexOf(project) && (
                <div className="mt-3 text-center">
                  <p className="mb-2">Deseja excluir este projeto?</p>

                  <div>
                    <button
                      className="py-1 px-3 mr-2 border-[1px] border-red-600 hover:bg-[#e4e4e4] text-red-600"
                      onClick={() => deleteProject(project.id)}
                    >
                      Sim
                    </button>

                    <button
                      className="py-1 px-3 border-[1px] border-black hover:bg-[#e4e4e4]"
                      onClick={() => setConfirmation(false)}
                    >
                      Não
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
