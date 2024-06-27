export interface Service {
  id: string;
  name: string;
  cost: number;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  budget: number;
  category: string;
  services: Service[];
}

export interface UserData {
  name?: string;
  email: string;
  password: string;
}
