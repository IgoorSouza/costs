import { api } from "../provider";
import { useEffect, useState, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const nameRegex = /\w/;

export default function EditProject() {
  const [project, setProject] = useState({});
  const [editProject, setEditProject] = useState(false);
  const [addService, setAddService] = useState(false);
  const [projectErrors, setProjectErrors] = useState({});
  const [serviceErrors, setServiceErrors] = useState({});
  const [totalSpent, setTotalSpent] = useState(0);

  const projectId = window.location.pathname.split("/")[2];

  const newName = useRef();
  const newBudget = useRef();
  const newCategory = useRef();
  const serviceName = useRef();
  const serviceCost = useRef();
  const serviceDescription = useRef();

  useEffect(() => {
    api.get(`/projects/${projectId}`).then((res) => setProject(res.data));
  }, []);

  useEffect(() => {
    if (project.services) {
      let total = 0;
      project.services.map((service) => {
        total += Number(service.cost);
      });
      setTotalSpent(total);
    }
  }, [project]);

  function confirmEdit() {
    let nameError = false;
    let budgetError = false;

    if (!nameRegex.test(newName.current.value)) {
      nameError = true;
    }

    if (newBudget.current.value === "") {
      budgetError = true;
    }

    if (newBudget.current.value < totalSpent) {
      budgetError = "insufficient";
    }

    if (nameError || budgetError) {
      setProjectErrors({
        name: nameError,
        budget: budgetError,
      });
    } else {
      const newProject = {
        name: newName.current.value,
        budget: newBudget.current.value,
        category: newCategory.current.value,
        services: project.services,
      };

      api
        .put(`projects/${project.id}`, newProject)
        .then(window.location.reload());
    }
  }

  function addNewService() {
    let nameError = false;
    let costError = false;

    if (!nameRegex.test(serviceName.current.value)) {
      nameError = true;
    }

    if (serviceCost.current.value === "") {
      costError = true;
    }

    if (serviceCost.current.value > project.budget - totalSpent) {
      costError = "insufficient";
    }

    if (nameError || costError) {
      setServiceErrors({
        name: nameError,
        cost: costError,
      });
    } else {
      const service = {
        name: serviceName.current.value,
        cost: serviceCost.current.value,
        description: serviceDescription.current.value,
      };

      const newServices = [...project.services, service];

      const newProject = { ...project, services: newServices };

      api
        .put(`projects/${project.id}`, newProject)
        .then(window.location.reload());
    }
  }

  function removeService(serviceIndex) {
    project.services.splice(serviceIndex, 1);

    if (!project.services) project.services = [];

    api.put(`projects/${project.id}`, project).then(window.location.reload());
  }

  return (
    <div className="flex flex-col my-10 w-[80%] m-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className=" p-3 bg-black text-[32px] text-amber-400 font-bold">
          {project.name}
        </h1>
        <button
          className="bg-black text-white hover:text-amber-400 px-3 py-2 text-[18px]"
          onClick={() => {
            setEditProject(!editProject);
            if (editProject) {
              setProjectErrors({ name: false, budget: false });
            }
          }}
        >
          Editar projeto
        </button>
      </div>

      {editProject ? (
        <div className="text-[18px] my-8">
          <div className="mb-3">
            <label htmlFor="serviceName" className="font-bold">
              Nome do projeto:
            </label>
            <input
              type="text"
              id="serviceName"
              defaultValue={project.name}
              className="w-full p-2 mt-2"
              ref={newName}
              onChange={() => {
                if (projectErrors.name)
                  setProjectErrors({
                    name: false,
                    budget: projectErrors.budget,
                  });
              }}
            />
            {projectErrors.name && (
              <p className="text-[12px] text-red-600">
                Informe o nome do projeto*
              </p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="serviceCost" className="font-bold">
              Orçamento do projeto:
            </label>
            <input
              type="number"
              id="serviceCost"
              min="0"
              defaultValue={project.budget}
              className="w-full p-2 mt-2"
              ref={newBudget}
              onChange={(event) => {
                if (event.target.value < 0) event.target.value = 0;
                if (event.target.value < totalSpent)
                  setProjectErrors({
                    name: projectErrors.name,
                    budget: "insufficient",
                  });
                if (projectErrors.budget)
                  setProjectErrors({
                    name: projectErrors.name,
                    budget: false,
                  });
              }}
            />
            {projectErrors.budget &&
              projectErrors.budget !== "insufficient" && (
                <p className="text-[12px] text-red-600">
                  Informe o orçamento do projeto*
                </p>
              )}

            {projectErrors.budget &&
              projectErrors.budget === "insufficient" && (
                <p className="text-[12px] text-red-600">
                  Orçamento insuficiente para cobrir os serviços atuais*
                </p>
              )}
          </div>

          <label htmlFor="projectCategory" className="font-bold">
            Selecione a categoria:
          </label>

          <select
            id="projectCategory"
            className="w-full p-2 mt-2"
            defaultValue={project.category}
            ref={newCategory}
          >
            <option>Infra</option>
            <option>Desenvolvimento</option>
            <option>Design</option>
            <option>Planejamento</option>
          </select>

          <button
            className="bg-black text-white hover:text-amber-400 px-3 py-2 text-[18px] mt-5"
            onClick={confirmEdit}
          >
            Confirmar edição
          </button>
        </div>
      ) : (
        <div className="mb-8">
          <p className="mb-1">
            <span className="font-bold text-[18px]">Categoria: </span>
            {project.category}
          </p>
          <p className="mb-1">
            <span className="font-bold text-[18px]">Total do orçamento: </span>
            R${project.budget}
          </p>
          <p>
            <span className="font-bold text-[18px]">Total utilizado: </span>
            R${totalSpent}
          </p>
        </div>
      )}

      <div className="py-6 border-y-2 border-zinc-400 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-[28px] font-bold">Adicione um serviço: </h2>
          <button
            className="bg-black text-white hover:text-amber-400 px-3 py-2 text-[18px]"
            onClick={() => {
              setAddService(!addService);
              if (addNewService) {
                setServiceErrors({ name: false, cost: false });
              }
            }}
          >
            Adicionar serviço
          </button>
        </div>

        {addService && (
          <>
            <div className="text-[18px] mt-8">
              <div className="mb-3">
                <label htmlFor="serviceName" className="font-bold">
                  Nome do serviço:
                </label>
                <input
                  type="text"
                  id="serviceName"
                  placeholder="Insira o nome do serviço"
                  className="w-full p-2 mt-2"
                  ref={serviceName}
                  onChange={() => {
                    if (serviceErrors.name) {
                      setServiceErrors({
                        name: false,
                        cost: serviceErrors.cost,
                      });
                    }
                  }}
                />
                {serviceErrors.name && (
                  <p className="text-[12px] text-red-600">
                    Informe o nome do serviço*
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="serviceCost" className="font-bold">
                  Custo do serviço:
                </label>
                <input
                  type="number"
                  id="serviceCost"
                  placeholder="Insira o valor total"
                  min="0"
                  className="w-full p-2 mt-2"
                  ref={serviceCost}
                  onChange={(event) => {
                    if (event.target.value < 0) event.target.value = 0;
                    if (serviceErrors.cost) {
                      setServiceErrors({
                        name: serviceErrors.name,
                        cost: false,
                      });
                    }
                    if (event.target.value > project.budget - totalSpent) {
                      setServiceErrors({
                        name: serviceErrors.name,
                        cost: "insufficient",
                      });
                    }
                  }}
                />
                {serviceErrors.cost &&
                  serviceErrors.cost !== "insufficient" && (
                    <p className="text-[12px] text-red-600">
                      Informe o custo do serviço*
                    </p>
                  )}

                {serviceErrors.cost &&
                  serviceErrors.cost === "insufficient" && (
                    <p className="text-[12px] text-red-600">
                      Orçamento insuficiente*
                    </p>
                  )}
              </div>

              <label htmlFor="serviceDescription" className="font-bold">
                Descrição do serviço (opcional):
              </label>
              <input
                type="text"
                id="serviceDescription"
                placeholder="Descreva o serviço"
                className="w-full p-2 mt-2"
                ref={serviceDescription}
              />
            </div>

            <button
              className="bg-black text-white hover:text-amber-400 px-3 py-2 text-[18px] mt-5"
              onClick={addNewService}
            >
              Adicionar serviço
            </button>
          </>
        )}
      </div>

      <h2 className="text-[28px] font-bold mb-3">Serviços: </h2>

      <div className="flex flex-col items-center md:items-start md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {project.services && project.services.length > 0 ? (
          project.services.map((service, index) => {
            return (
              <div
                className="w-[300px] p-3 mb-5 md:mb-0 border-[1px] border-zinc-400 rounded-md justify-self-center"
                key={index}
              >
                <h2 className="bg-black text-amber-400 text-2xl font-bold p-2 mb-5">
                  {service.name}
                </h2>

                <p className="text-zinc-500 mb-3">
                  <span className="font-bold">Custo total: </span>
                  R${service.cost}
                </p>

                <p className="text-zinc-500 mb-5 break-words">
                  {service.description}
                </p>

                <button
                  className="flex items-center py-2 px-4 border-[1px] border-black hover:bg-[#e4e4e4]"
                  onClick={() => removeService(index)}
                >
                  <FaRegTrashAlt className="mr-2" /> Excluir
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-[18px] sm:mb-10">Não há serviços cadastrados.</p>
        )}
      </div>
    </div>
  );
}
