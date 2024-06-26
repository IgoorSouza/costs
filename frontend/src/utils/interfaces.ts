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
  authenticating: boolean;
  register: (userData: UserData) => void;
  login: (userData: UserData) => void;
  logout: () => void;
}

export interface AuthData {
  name: string;
  accessToken: string;
}

export interface UserData {
  name?: string;
  email: string;
  password: string;
}
