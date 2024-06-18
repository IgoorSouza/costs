import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import { Project } from "../utils/interfaces";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([] as Project[]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const { data: projects } = await api.get("/projects");

        setProjects(projects);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Ocorreu um erro ao buscar seus projetos. Por favor, reinicie a página e tente novamente."
        );
      }
    }

    getProjects();
  }, []);

  async function removeProject(projectId: string) {
    try {
      await api.delete(`/projects/remove/${projectId}`);

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id != projectId)
      );
      toast.success("Projeto removido com sucesso!");
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao remover o projeto. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  if (loading) {
    return (
      <h1 className="mt-6 text-2xl text-center md:mt-10 md:text-3xl">
        Carregando projetos...
      </h1>
    );
  }

  return (
    <div className="flex flex-col w-[90%] my-10 mx-auto">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-2xl font-bold md:text-4xl">Meus Projetos</h1>

        <Link
          to="new"
          className="px-3 py-2 text-[18px] text-white bg-black hover:text-amber-400"
        >
          Criar projeto
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="mx-auto">
          <h2 className="text-xl md:text-2xl">Nenhum projeto registrado.</h2>
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              removeProject={removeProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
