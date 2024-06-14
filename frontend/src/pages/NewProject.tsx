import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Project from "../interfaces/project";

export default function NewProject() {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<Project>({} as Project);

  function createProject(event: FormEvent) {
    event.preventDefault();

    try {
      api
        .post("/projects/create", projectData)
        .then(() => navigate("/projects"));
    } catch (error) {
      console.error(error);
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
          required
          placeholder="Insira o nome do projeto"
          className="p-3 mb-2 md:mb-4"
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
          {projectData?.budget && <span>R$</span>}
          <input
            type="number"
            min={1}
            id="projectBudget"
            required
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
          className="p-3 mb-2 md:mb-4"
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
          className="w-1/2 p-2 mx-auto mt-2 text-lg bg-black text-white md:p-3 hover:text-amber-400"
        >
          Criar projeto
        </button>
      </form>
    </div>
  );
}
