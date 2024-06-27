import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { Project } from "../utils/interfaces";

export default function NewProject() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<Project>({
    category: "Infraestrutura",
  } as Project);
  const [loading, setLoading] = useState<boolean>(false);

  async function createProject(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      await api.post("/projects/create", projectData);

      toast.success("Projeto criado com sucesso!");
      navigate("/projects");
    } catch (error: unknown) {
      setLoading(false);
      toast.error(
        "Ocorreu um erro ao criar o projeto. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  return (
    <div className="flex flex-col w-[90%] max-w-[1200px] mx-auto my-12">
      <h1 className="text-3xl font-bold mb-6 max-md:text-center md:text-4xl">
        Criar Projeto
      </h1>

      <form className="flex flex-col" onSubmit={createProject}>
        <label
          htmlFor="projectName"
          className="text-lg font-bold mb-1 md:text-xl"
        >
          Nome do projeto
        </label>
        <input
          type="text"
          id="projectName"
          maxLength={50}
          required
          disabled={loading}
          placeholder="Insira o nome do projeto"
          className="p-3 mb-2 disabled:bg-white md:mb-4"
          onChange={(event) => {
            setProjectData((projectData) => ({
              ...projectData,
              name: event.target.value,
            }));
          }}
        />

        <label
          htmlFor="projectBudget"
          className="text-lg font-bold mb-1 md:text-xl"
        >
          Orçamento do projeto
        </label>
        <div className="flex p-3 mb-2 md:mb-4 bg-white">
          {projectData?.budget >= 0 && <span>R$</span>}
          <input
            type="number"
            id="projectBudget"
            min={1}
            maxLength={10}
            step={0.01}
            required
            disabled={loading}
            className="w-full ml-1 outline-none"
            placeholder="Insira o orçamento do projeto"
            onChange={(event) => {
              setProjectData((projectData) => ({
                ...projectData,
                budget: Number(event.target.value),
              }));
            }}
          />
        </div>

        <label
          htmlFor="projectCategory"
          className="text-lg font-bold mb-1 md:text-xl"
        >
          Selecione a categoria:
        </label>
        <select
          id="projectCategory"
          disabled={loading}
          className="p-3 mb-2 bg-white md:mb-4"
          onChange={(event) => {
            setProjectData((projectData) => ({
              ...projectData,
              category: event.target.value,
            }));
          }}
        >
          <option>Infraestrutura</option>
          <option>Desenvolvimento</option>
          <option>Design</option>
          <option>Planejamento</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-1/2 p-2 mx-auto mt-2 text-lg bg-black text-white disabled:opacity-50 md:p-3 ${
            !loading && "hover:text-amber-400"
          }`}
        >
          {loading ? "Criando projeto..." : "Criar projeto"}
        </button>
      </form>
    </div>
  );
}
