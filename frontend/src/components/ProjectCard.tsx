import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { Project } from "../utils/interfaces";

interface Props {
  project: Project;
  removeProject: (projectId: string) => void;
}

export default function ProjectCard({ project, removeProject }: Props) {
  const [removeConfirmation, setRemoveConfirmation] = useState<boolean>(false);

  return (
    <div className="w-[300px] p-3 max-md:mx-auto border-[1px] border-zinc-400 rounded-md">
      <h2 className="p-2 mb-5 text-2xl font-bold rounded-sm text-amber-400 bg-black">
        {project.name}
      </h2>

      <p className="mb-3 text-zinc-500">
        <span className="font-semibold">Orçamento: </span>
        R${project.budget}
      </p>

      <p className="mb-5 text-zinc-500 project flex items-center">
        <span
          className={`size-3 mr-1 rounded-[50%] ${
            project.category === "Desenvolvimento"
              ? "bg-[#a0e7e5]"
              : project.category === "Design"
              ? "bg-[#b4f8c8]"
              : project.category === "Infraestrutura"
              ? "bg-[#ffaebc]"
              : "bg-[#fbe7c6]"
          }`}
        />
        {project.category}
      </p>

      <div className="w-56 flex justify-around">
        <Link
          to={`${project.id}`}
          className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]"
        >
          <FaPencil className="mr-2" /> Editar
        </Link>

        <button
          className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]"
          onClick={() => setRemoveConfirmation(true)}
        >
          <FaRegTrashAlt className="mr-2" /> Excluir
        </button>
      </div>

      {removeConfirmation && (
        <div className="mt-3 text-center">
          <p className="mb-2">Deseja excluir este projeto?</p>

          <div>
            <button
              className="py-1 px-3 mr-2 border-[1px] border-red-600 hover:bg-[#e4e4e4] text-red-600"
              onClick={() => removeProject(project.id)}
            >
              Sim
            </button>

            <button
              className="py-1 px-3 border-[1px] border-black hover:bg-[#e4e4e4]"
              onClick={() => setRemoveConfirmation(false)}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
