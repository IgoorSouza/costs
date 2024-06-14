import { createContext, useState, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface AuthContext {
  authData: AuthData;
  register: (userData: UserData) => void;
  login: (userData: UserData) => void;
}

interface AuthData {
  name: string;
  token: string;
}

interface UserData {
  name?: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthData] = useState<AuthData>(() => {
    const data = localStorage.getItem("authData");

    if (data) {
      const parsedData = JSON.parse(data);

      api.defaults.headers.common.Authorization = `Bearer ${parsedData.token}`;

      return parsedData;
    } else {
      return null;
    }
  });
  const navigate = useNavigate();

  async function register(userData: UserData) {
    await api
      .post("/users/register", userData)
      .then(() => login(userData))
      .catch((error) => console.log(error));
  }

  async function login(userData: UserData) {
    await api
      .post("/users/login", userData)
      .then((response) => {
        setAuthData(response.data);
        api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem("authData", JSON.stringify(response.data));

        navigate("/projects");
      })
      .catch((error) => console.log(error));
  }

  return (
    <AuthContext.Provider value={{ authData, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
