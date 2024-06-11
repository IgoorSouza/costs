import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../services/api";
import Project from "../interfaces/project";
import Service from "../interfaces/service";

export default function ProjectDetails() {
  const projectId = useParams().id;
  const [project, setProject] = useState<Project>(async () => {
    const { data: project } = await api.get(`/project/${projectId}`);

    return project;
  });
  const [editProjectData, setEditProjectData] = useState<Project>(project);
  const [serviceData, setServiceData] = useState<Service>({
    id: "901783109cckjnsacas",
    name: "",
    cost: 1,
  });
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showServiceForm, setShowServiceForm] = useState<boolean>(false);
  const [spentBudget, setSpentBudget] = useState<number>(0);

  useEffect(() => {
    let newSpentBudget = 0;

    project.services?.forEach((service) => {
      newSpentBudget += service.cost;
    });

    setSpentBudget(newSpentBudget);
  }, [project.services]);

  function editProject(event: FormEvent) {
    event.preventDefault();
    if (project === editProjectData) return;

    api.put(`/project/${project.id}`, editProjectData).then((response) => {
      setProject(response.data);
      setShowEditForm(false);
    });
  }

  function addService(event: FormEvent) {
    event.preventDefault();

    api.post(`/services/new`, serviceData).then((response) => {
      setProject((prevProject) => ({
        ...prevProject,
        services: [...prevProject.services, response.data],
      }));
    });
  }

  function deleteService(serviceId: string) {
    api.delete(`/services/delete/${serviceId}`).then(() =>
      setProject((project) => ({
        ...project,
        services: project.services.filter((service) => service.id != serviceId),
      }))
    );
  }

  return (
    <div className="flex flex-col w-[90%] max-w-[1200px] my-10 mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="p-3 text-2xl font-bold text-amber-400 bg-black md:text-3xl">
          {project.name}
        </h1>
        <button
          className="p-2 text-lg text-white bg-black hover:text-amber-400"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          {showEditForm ? "Voltar" : "Editar projeto"}
        </button>
      </div>

      {showEditForm ? (
        <form
          className="flex flex-col items-center text-[18px] my-5"
          onSubmit={editProject}
        >
          <div className="w-full mb-3">
            <label htmlFor="serviceName" className="font-bold">
              Nome do projeto:
            </label>
            <input
              type="text"
              id="serviceName"
              required
              defaultValue={project.name}
              placeholder="Insira o novo nome do projeto"
              className="w-full p-2 mt-2"
              onChange={(event) => {
                setEditProjectData((editProjectData) => ({
                  ...editProjectData,
                  name: event.target.value,
                }));
              }}
            />
          </div>

          <div className="w-full mb-3">
            <label htmlFor="serviceCost" className="font-bold">
              Orçamento do projeto:
            </label>
            <div className="flex w-full p-2 mt-2 bg-white">
              {project.budget && <span>R$</span>}
              <input
                type="number"
                id="serviceCost"
                required
                min={1}
                defaultValue={project.budget}
                placeholder="Insira o novo orçamento do projeto"
                className="w-full ml-1 outline-none"
                onChange={(event) => {
                  setEditProjectData((editProjectData) => ({
                    ...editProjectData,
                    budget: Number(event.target.value),
                  }));
                }}
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="projectCategory" className="font-bold">
              Selecione a categoria:
            </label>
            <select
              id="projectCategory"
              className="w-full p-2 mt-2"
              defaultValue={project.category}
              onChange={(event) => {
                setEditProjectData((editProjectData) => ({
                  ...editProjectData,
                  category: event.target.value,
                }));
              }}
            >
              <option>Infra</option>
              <option>Desenvolvimento</option>
              <option>Design</option>
              <option>Planejamento</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-1/2 py-2 mt-5 text-lg text-white bg-black hover:text-amber-400"
          >
            Editar
          </button>
        </form>
      ) : (
        <div className="mb-8">
          <p className="mb-1 text-lg md:text-xl">
            <span className="font-bold">Categoria: </span>
            {project.category}
          </p>
          <p className="mb-1 text-lg md:text-xl">
            <span className="font-bold">Orçamento total: </span>
            R$ {project.budget}
          </p>
          <p className="text-lg md:text-xl">
            <span className="font-bold">Orçamento utilizado: </span>
            R${spentBudget}
          </p>
        </div>
      )}

      <div className="py-6 border-y-2 border-zinc-400 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Adicione um serviço:</h2>
          <button
            className="px-3 py-2 text-[18px] text-white bg-black hover:text-amber-400"
            onClick={() => setShowServiceForm(!showServiceForm)}
          >
            {showServiceForm ? "Voltar" : "Adicionar"}
          </button>
        </div>

        {showServiceForm && (
          <form
            className="flex flex-col items-center mt-5 text-lg"
            onSubmit={addService}
          >
            <div className="w-full mb-3">
              <label htmlFor="serviceName" className="font-bold">
                Nome do serviço:
              </label>
              <input
                type="text"
                id="serviceName"
                required
                placeholder="Insira o nome do serviço"
                className="w-full p-2 mt-2"
                onChange={(event) => {
                  setServiceData((serviceData) => ({
                    ...serviceData,
                    name: event.target.value,
                  }));
                }}
              />
            </div>

            <div className="w-full mb-3">
              <label htmlFor="serviceCost" className="font-bold">
                Custo do serviço:
              </label>
              <input
                type="number"
                id="serviceCost"
                required
                placeholder="Insira o valor total"
                min={1}
                className="w-full p-2 mt-2"
                onChange={(event) =>
                  setServiceData((serviceData) => ({
                    ...serviceData,
                    cost: Number(event.target.value),
                  }))
                }
              />
            </div>

            <div className="w-full">
              <label htmlFor="serviceDescription" className="font-bold">
                Descrição do serviço (opcional):
              </label>
              <input
                type="text"
                id="serviceDescription"
                placeholder="Descreva o serviço"
                className="w-full p-2 mt-2"
                onChange={(event) =>
                  setServiceData((serviceData) => ({
                    ...serviceData,
                    description: event.target.value,
                  }))
                }
              />
            </div>

            <button
              type="submit"
              className="w-1/2 py-2 mt-5 text-lg text-white bg-black hover:text-amber-400"
            >
              Adicionar serviço
            </button>
          </form>
        )}
      </div>

      <h2 className="text-[28px] font-bold mb-3">Serviços: </h2>

      <div className="flex flex-wrap gap-5">
        {project.services?.length > 0 ? (
          project.services.map((service) => {
            return (
              <div
                className="flex flex-col w-[300px] p-3 rounded-md border-[1px] border-zinc-400 max-md:mx-auto"
                key={service.id}
              >
                <div>
                  <h2 className="bg-black text-amber-400 text-2xl font-bold p-2 mb-4">
                    {service.name}
                  </h2>
                  <p className="mb-2 text-zinc-500">
                    <span className="font-bold">Custo total: </span>
                    R${service.cost}
                  </p>
                  <p className="mb-4 text-zinc-500">{service.description}</p>
                </div>

                <button
                  className="self-start flex items-center py-2 px-4 mt-auto border-[1px] border-black hover:bg-[#e4e4e4]"
                  onClick={() => deleteService(service.id)}
                >
                  <FaRegTrashAlt className="mr-2" /> Excluir
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-[18px]">Não há serviços registrados.</p>
        )}
      </div>
    </div>
  );
}
