import Service from "./service";

export default interface Project {
  id: string;
  name: string;
  budget: number;
  category: string;
  services: Service[];
}
