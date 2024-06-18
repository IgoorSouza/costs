import { createContext, useState, PropsWithChildren } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContextObject, AuthData, UserData } from "../utils/interfaces";

export const AuthContext = createContext({} as AuthContextObject);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const data = localStorage.getItem("authData");

    if (data) {
      const parsedData = JSON.parse(data);
      api.defaults.headers.common.Authorization = `Bearer ${parsedData.token}`;
      return parsedData;
    }

    return null;
  });

  async function register(userData: UserData) {
    try {
      await api.post("/users/register", userData);

      toast.success("Conta criada com sucesso!");
      login(userData);
    } catch (error: any) {
      if (error.response?.status === 409) {
        return toast.error(
          "O email informado já está sendo utilizado por outro usuário."
        );
      }

      toast.error(
        "Ocorreu um erro ao criar a conta. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  async function login(userData: UserData) {
    try {
      const { data: authData } = await api.post("/users/login", userData);

      setAuthData(authData);
      api.defaults.headers.common.Authorization = `Bearer ${authData.token}`;
      localStorage.setItem("authData", JSON.stringify(authData));

      toast.success("Login realizado com sucesso!");
    } catch (error: any) {
      if (error.response?.status === 404) {
        return toast.error(
          "O email informado não corresponde a nenhum usuário."
        );
      }

      if (error.response?.status === 401) {
        return toast.error("Senha incorreta.");
      }

      toast.error(
        "Ocorreu um erro ao realizar o login. Por favor, reinicie a página e tente novamente."
      );
    }
  }

  function logout() {
    localStorage.removeItem("authData");
    api.defaults.headers.common.Authorization = undefined;
    setAuthData(null);
  }

  return (
    <AuthContext.Provider value={{ authData, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
