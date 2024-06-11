import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import api from "../services/api";
import Project from "../interfaces/project";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(async () => {
    try {
      const { data: projects } = await api.get("/projects");

      return projects;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  function deleteProject(projectId: string) {
    api
      .delete(`/projects/${projectId}`)
      .then(() =>
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id != projectId)
        )
      );
  }

  return (
    <div className="flex flex-col w-[90%] my-10 mx-auto">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-2xl font-bold md:text-4xl">Meus Projetos</h1>

        <Link
          to="/new"
          className="px-3 py-2 text-[18px] text-white bg-black hover:text-amber-400"
        >
          Criar projeto
        </Link>
      </div>

      {projects.length === 0 && (
        <div className="mx-auto">
          <h2 className="text-xl md:text-2xl">Nenhum projeto registrado.</h2>
        </div>
      )}

      <div className="flex flex-wrap items-start gap-5">
        {projects.length > 0 ? (
          projects.map((project: Project) => {
            return (
              <div
                className="w-[300px] p-3 max-md:mx-auto border-[1px] border-zinc-400 rounded-md"
                key={project.id}
              >
                <h2 className="p-2 mb-5 text-2xl font-bold rounded-sm text-amber-400 bg-black">
                  {project.name}
                </h2>

                <p className="mb-3 text-zinc-500">
                  <span className="font-semibold">Orçamento: </span>
                  R${project.budget}
                </p>

                <p className="flex items-center mb-5 text-zinc-500">
                  <span
                    className={`size-3 mr-1 rounded-full bg-${
                      project.category === "Desenvolvimento"
                        ? "[#a0e7e5]"
                        : project.category === "Design"
                        ? "[#b4f8c8]"
                        : project.category === "Infraestrutura"
                        ? "[#ffaebc]"
                        : "[#fbe7c6]"
                    } `}
                  />
                  {project.category}
                </p>

                <div className="w-56 flex justify-around">
                  <Link to={`/project/${project.id}`}>
                    <button className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]">
                      <FaPencil className="mr-2" /> Editar
                    </button>
                  </Link>

                  <button
                    className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]"
                    onClick={() => setDeleteConfirmation(project.id)}
                  >
                    <FaRegTrashAlt className="mr-2" /> Excluir
                  </button>
                </div>

                {deleteConfirmation === project.id && (
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
                        onClick={() => setDeleteConfirmation(null)}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="w-full text-xl text-center">
            Não há projetos registrados.
          </p>
        )}
      </div>
    </div>
  );
}
