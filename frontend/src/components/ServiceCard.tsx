import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Service } from "../utils/interfaces";

interface Props {
  service: Service;
  removeService: (serviceId: string) => void;
}

export default function ServiceCard({ service, removeService }: Props) {
  const [removeConfirmation, setRemoveConfirmation] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-[300px] p-3 rounded-md border-[1px] border-zinc-400 max-md:mx-auto">
      <h2 className="bg-black text-amber-400 text-2xl font-bold p-2 mb-4">
        {service.name}
      </h2>

      <p className="mb-3 text-zinc-500">
        <span className="font-bold">Custo total: </span>
        R${service.cost}
      </p>

      <p className="mb-5 text-zinc-500">{service.description}</p>

      <button
        className="self-start flex items-center py-2 px-4 mt-auto border-[1px] border-black hover:bg-[#e4e4e4]"
        onClick={() => setRemoveConfirmation(true)}
      >
        <FaRegTrashAlt className="mr-2" /> Excluir
      </button>

      {removeConfirmation && (
        <div className="mt-3 text-center">
          <p className="mb-2">Deseja excluir este projeto?</p>

          <div>
            <button
              className="py-1 px-3 mr-2 border-[1px] border-red-600 hover:bg-[#e4e4e4] text-red-600"
              onClick={() => removeService(service.id)}
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
