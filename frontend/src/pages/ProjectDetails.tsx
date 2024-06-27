import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import api from "../services/api";
import Card from "../components/Card";
import { Project, Service } from "../utils/interfaces";

export default function ProjectDetails() {
  const [project, setProject] = useState<Project>({} as Project);
  const [editProjectData, setEditProjectData] = useState<Project>(
    {} as Project
  );
  const [services, setServices] = useState([] as Service[]);
  const [serviceData, setServiceData] = useState<Service>({} as Service);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [showServiceForm, setShowServiceForm] = useState<boolean>(false);
  const [spentBudget, setSpentBudget] = useState<number>(0);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProject() {
      try {
        const { data: project } = await api.get(`/projects/${projectId}`);

        setProject(project);
        setEditProjectData(project);
        setServices(project.services);
        setInitialLoading(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          toast.error("Projeto não encontrado.");
          navigate("/projects");
          return;
        }

        toast.error(
          "Ocorreu um erro ao buscar os dados do projeto. Por favor, reinicie a página e tente novamente."
        );
      }
    }

    getProject();
  }, [projectId, navigate]);

  useEffect(() => {
    let newSpentBudget = 0;

    services.forEach((service) => {
      newSpentBudget += service.cost;
    });

    setSpentBudget(newSpentBudget);
  }, [services]);

  async function editProject(event: FormEvent) {
    event.preventDefault();

    if (
      editProjectData.name === project.name &&
      editProjectData.budget === project.budget &&
      editProjectData.category === project.category
    ) {
      setShowEditForm(false);
      return;
    }

    if (editProjectData.budget < spentBudget) {
      toast.error(
        "O novo orçamento é inferior ao orçamento gasto pelos serviços registrados no momento."
      );
      return;
    }

    setLoading(true);

    try {
      const { data: project } = await api.put("/projects/update", {
        id: editProjectData.id,
        name: editProjectData.name,
        budget: editProjectData.budget,
        category: editProjectData.category,
      });

      setProject(project);
      setEditProjectData(project);
      setShowEditForm(false);
      setLoading(false);
      toast.success("Projeto editado com sucesso!");
    } catch (error: unknown) {
      setLoading(false);
      toast.error(
        "Ocorreu um erro ao atualizar os dados do projeto. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  async function addService(event: FormEvent) {
    event.preventDefault();

    if (project.budget - spentBudget < serviceData.cost) {
      toast.error("Orçamento insuficiente.");
      return;
    }

    setLoading(true);

    try {
      const { data: service } = await api.post("/services/create", {
        ...serviceData,
        projectId,
      });

      setServices((prevServices) => [...prevServices, service]);
      setShowServiceForm(false);
      setLoading(false);
      toast.success("Serviço adicionado com sucesso!");
    } catch (error: unknown) {
      toast.error(
        "Ocorreu um erro ao adicionar o serviço. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  async function removeService(serviceId: string) {
    try {
      await api.delete(`/services/remove/${serviceId}`);

      setServices((prevServices) =>
        prevServices.filter((service) => service.id != serviceId)
      );
      toast.success("Serviço removido com sucesso.");
    } catch (error: unknown) {
      toast.error(
        "Ocorreu um erro ao remover o serviço. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  return initialLoading ? (
    <h1 className="mt-6 text-2xl text-center md:mt-10 md:text-3xl">
      Carregando projeto...
    </h1>
  ) : (
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
          <label htmlFor="serviceName" className="self-start font-bold">
            Nome do projeto:
          </label>
          <input
            type="text"
            id="serviceName"
            maxLength={50}
            required
            disabled={loading}
            defaultValue={project.name}
            placeholder="Insira o novo nome do projeto"
            className="w-full p-2 mt-2 mb-3 disabled:opacity-50 disabled:bg-white"
            onChange={(event) => {
              setEditProjectData((editProjectData) => ({
                ...editProjectData,
                name: event.target.value,
              }));
            }}
          />

          <label htmlFor="serviceCost" className="self-start font-bold">
            Orçamento do projeto:
          </label>
          <div
            className={`flex w-full p-2 mt-2 mb-3 bg-white ${
              loading && "opacity-50"
            }`}
          >
            {project.budget >= 0 && <span>R$</span>}
            <input
              type="number"
              id="serviceCost"
              maxLength={10}
              min={1}
              step={0.01}
              required
              disabled={loading}
              defaultValue={project.budget}
              placeholder="Insira o novo orçamento do projeto"
              className="w-full ml-1 outline-none disabled:bg-white"
              onChange={(event) => {
                setEditProjectData((editProjectData) => ({
                  ...editProjectData,
                  budget: Number(event.target.value),
                }));
              }}
            />
          </div>

          <label htmlFor="projectCategory" className="self-start font-bold">
            Selecione a categoria:
          </label>
          <select
            id="projectCategory"
            className="w-full p-2 mt-2 disabled:opacity-50 disabled:bg-white"
            disabled={loading}
            defaultValue={project.category}
            onChange={(event) => {
              setEditProjectData((editProjectData) => ({
                ...editProjectData,
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
            className={`w-1/2 py-2 mt-5 text-lg text-white bg-black disabled:opacity-50 ${
              !loading && "hover:text-amber-400"
            }`}
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
            R${project.budget}
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
            <label htmlFor="serviceName" className="self-start font-bold">
              Nome do serviço:
            </label>
            <input
              type="text"
              id="serviceName"
              maxLength={50}
              required
              disabled={loading}
              placeholder="Insira o nome do serviço"
              className="w-full p-2 mt-2 mb-3 disabled:opacity-50 disabled:bg-white"
              onChange={(event) => {
                setServiceData((serviceData) => ({
                  ...serviceData,
                  name: event.target.value,
                }));
              }}
            />

            <label htmlFor="serviceCost" className="self-start font-bold">
              Custo do serviço:
            </label>
            <div
              className={`flex w-full p-2 mt-2 mb-3 bg-white ${
                loading && "opacity-50"
              }`}
            >
              {serviceData.cost >= 0 && <span>R$</span>}
              <input
                type="number"
                id="serviceCost"
                required
                min={1}
                maxLength={10}
                step={0.01}
                disabled={loading}
                placeholder="Insira o custo do serviço"
                className="w-full ml-1 outline-none disabled:bg-white"
                onChange={(event) =>
                  setServiceData((serviceData) => ({
                    ...serviceData,
                    cost: Number(event.target.value),
                  }))
                }
              />
            </div>

            <label
              htmlFor="serviceDescription"
              className="self-start font-bold"
            >
              Descrição do serviço (opcional):
            </label>
            <input
              type="text"
              id="serviceDescription"
              maxLength={200}
              disabled={loading}
              placeholder="Insira a descrição do serviço"
              className="w-full p-2 mt-2 disabled:opacity-50 disabled:bg-white"
              onChange={(event) =>
                setServiceData((serviceData) => ({
                  ...serviceData,
                  description: event.target.value,
                }))
              }
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 py-2 mt-5 text-lg text-white bg-black disabled:opacity-50 ${
                !loading && "hover:text-amber-400"
              }`}
            >
              Adicionar serviço
            </button>
          </form>
        )}
      </div>

      <h2 className="text-[28px] font-bold mb-3">Serviços: </h2>

      <div className="flex flex-wrap gap-5">
        {services.length > 0 ? (
          services.map((service) => (
            <Card
              key={service.id}
              service={service}
              removeService={removeService}
            />
          ))
        ) : (
          <p className="text-[18px]">Não há serviços registrados.</p>
        )}
      </div>
    </div>
  );
}
