import { useState, useContext, FormEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";

interface UserData {
  name?: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, login } = useContext(AuthContext);
  const location = useLocation();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (location.pathname === "/register") {
      register(userData);
    } else {
      login(userData);
    }
  }

  return (
    <form
      className="flex flex-col w-[90%] max-w-[1000px] mx-auto my-6"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-3 text-3xl text-center font-bold md:text-4xl">
        {location.pathname === "/register" ? "Criar conta" : "Entrar"}
      </h1>

      {location.pathname === "/register" && (
        <>
          <label
            htmlFor="userName"
            className="text-lg font-bold mb-1 md:text-xl"
          >
            Nome
          </label>
          <input
            type="text"
            id="userName"
            required
            placeholder="Insira seu nome"
            className="mb-2 p-3"
            onChange={(event) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                name: event.target.value,
              }))
            }
          />
        </>
      )}

      <label htmlFor="userEmail" className="text-lg font-bold mb-1 md:text-xl">
        E-mail
      </label>
      <input
        type="email"
        id="userEmail"
        required
        placeholder="Insira seu email"
        className="mb-2 p-3"
        onChange={(event) =>
          setUserData((prevUserData) => ({
            ...prevUserData,
            email: event.target.value,
          }))
        }
      />

      <label
        htmlFor="userPassword"
        className="text-lg font-bold mb-1 md:text-xl"
      >
        Senha
      </label>
      <div className="flex bg-white">
        <input
          type={showPassword ? "text" : "password"}
          id="userPassword"
          required
          placeholder="Insira sua senha"
          className="w-full p-3"
          onChange={(event) =>
            setUserData((prevUserData) => ({
              ...prevUserData,
              password: event.target.value,
            }))
          }
        />
        <img
          src={showPassword ? hide : show}
          className="bg-slate-400 px-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <button
        type="submit"
        className="w-1/2 mt-5 mb-3 mx-auto p-2 text-lg bg-black text-white md:p-3 hover:text-amber-400"
      >
        {location.pathname === "/register" ? "Criar conta" : "Entrar"}
      </button>

      <p className="text-center text-sm md:text-md">
        {location.pathname === "/register"
          ? "Já possui uma conta?"
          : "Ainda não possui uma conta?"}{" "}
        <Link
          to={location.pathname === "/register" ? "/login" : "/register"}
          className="text-blue-600 underline"
        >
          {location.pathname === "/register" ? "Entre!" : "Se cadastre!"}
        </Link>
      </p>
    </form>
  );
}
