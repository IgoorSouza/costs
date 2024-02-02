import { useState, useRef } from "react";
import { api } from "../provider";

const nameRegex = /\w/;

export default function NewProject() {
  const [errors, setErrors] = useState({});

  const projectName = useRef();
  const projectBudget = useRef();
  const projectCategory = useRef();

  function createProject() {
    let nameError = false;
    let budgetError = false;
    let categoryError = false;

    if (!nameRegex.test(projectName.current.value)) {
      nameError = true;
    }

    if (projectBudget.current.value === "") {
      budgetError = true;
    }

    if (projectCategory.current.value === "Selecione uma opção") {
      categoryError = true;
    }

    if (
      nameError === false &&
      budgetError === false &&
      categoryError === false
    ) {
      const newProject = {
        name: projectName.current.value,
        budget: projectBudget.current.value,
        category: projectCategory.current.value,
        services: [],
      };

      api
        .post("/projects", newProject)
        .then((window.location.href = "/projects"));
    } else {
      setErrors({
        name: nameError,
        budget: budgetError,
        category: categoryError,
      });
    }
  }

  return (
    <div className="w-96 md:w-[500px] flex flex-col m-auto my-14">
      <h1 className="text-4xl font-bold mb-5">Criar Projeto</h1>

      <p className="text-[18px] text-zinc-400 mb-6">
        Crie seu projeto para depois adicionar os serviços.
      </p>

      <div className="flex flex-col mb-4">
        <label htmlFor="projectName" className="text-[20px] font-bold mb-2">
          Nome do projeto:
        </label>
        <input
          type="text"
          id="projectName"
          placeholder="Insira o nome do projeto"
          className="p-3"
          ref={projectName}
          onChange={() => {
            if (errors.name) {
              setErrors({
                name: false,
                budget: errors.budget,
                category: errors.category,
              });
            }
          }}
        />
        {errors.name && (
          <p className="text-[12px] text-red-600">Informe o nome do projeto*</p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="projectBudget" className="text-[20px] font-bold mb-2">
          Orçamento do projeto:
        </label>
        <input
          type="number"
          id="projectBudget"
          min="0"
          placeholder="Insira o orçamento total"
          className="p-3"
          ref={projectBudget}
          onChange={(event) => {
            if (event.target.value < 0) event.target.value = 0;
            if (errors.budget) {
              setErrors({
                name: errors.name,
                budget: false,
                category: errors.category,
              });
            }
          }}
        />
        {errors.budget && (
          <p className="text-[12px] text-red-600">
            Informe o orçamento do projeto*
          </p>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="projectCategory" className="text-[20px] font-bold mb-2">
          Selecione a categoria:
        </label>
        <select
          id="projectCategory"
          defaultValue="Selecione uma opção"
          className="p-3"
          ref={projectCategory}
          onChange={() => {
            if (errors.category)
              setErrors({
                name: errors.name,
                budget: errors.budget,
                category: false,
              });
          }}
        >
          <option disabled>Selecione uma opção</option>
          <option>Infra</option>
          <option>Desenvolvimento</option>
          <option>Design</option>
          <option>Planejamento</option>
        </select>
        {errors.category && (
          <p className="text-[12px] text-red-600">
            Informe a categoria do projeto*
          </p>
        )}
      </div>

      <button
        className="w-28 p-2 bg-black text-white hover:text-amber-400"
        onClick={createProject}
      >
        Criar projeto
      </button>
    </div>
  );
}
