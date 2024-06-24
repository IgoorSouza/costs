import { createContext, useState, useEffect, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContextObject, AuthData, UserData } from "../utils/interfaces";

export const AuthContext = createContext({} as AuthContextObject);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthData() {
      try {
        const response = await api.post("/users/refresh");
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
        setAuthData(response.data);
      } catch (error) {
        navigate("/");
      } finally {
        setAuthenticating(false);
      }
    }

    getAuthData();
  }, []);

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
      api.defaults.headers.common.Authorization = `Bearer ${authData.accessToken}`;
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

  async function logout() {
    await api.post("/users/logout");
    setAuthData(null);
    api.defaults.headers.common.Authorization = undefined;
  }

  return (
    <AuthContext.Provider
      value={{ authData, authenticating, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
