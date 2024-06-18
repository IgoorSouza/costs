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

export interface AuthContextObject {
  authData: AuthData | null;
  register: (userData: UserData) => Promise<string | undefined>;
  login: (userData: UserData) => Promise<string | undefined>;
  logout: () => void;
}

export interface AuthData {
  name: string;
  token: string;
}

export interface UserData {
  name?: string;
  email: string;
  password: string;
}
