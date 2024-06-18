import { useState, useContext, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { UserData } from "../utils/interfaces";
import show from "../assets/show.svg";
import hide from "../assets/hide.svg";

export default function AuthForm({ action }: { action: string }) {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { authData, register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) navigate("/projects");
  }, [authData, navigate]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (action === "register") {
      await register(userData);
    } else {
      await login(userData);
    }

    setLoading(false);
  }

  return (
    <form
      className="flex flex-col w-[90%] max-w-[1000px] mx-auto my-6"
      onSubmit={handleSubmit}
    >
      <h1 className="mb-3 text-3xl text-center font-bold md:text-4xl">
        {action === "register" ? "Criar conta" : "Entrar"}
      </h1>

      {action === "register" && (
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
            maxLength={40}
            disabled={loading}
            placeholder="Insira seu nome"
            className="mb-2 p-3 disabled:bg-white disabled:opacity-50"
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
        disabled={loading}
        placeholder="Insira seu email"
        className="mb-2 p-3 disabled:bg-white disabled:opacity-50"
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
      <div className={`flex bg-white ${loading && "opacity-50"}`}>
        <input
          type={showPassword ? "text" : "password"}
          id="userPassword"
          required
          minLength={6}
          disabled={loading}
          placeholder="Insira sua senha"
          className="w-full p-3 disabled:bg-white"
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
          onClick={() => (loading ? () => {} : setShowPassword(!showPassword))}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-1/2 mt-5 mb-3 mx-auto p-2 text-lg bg-black text-white disabled:opacity-50 md:p-3 ${
          !loading && "hover:text-amber-400"
        }`}
      >
        {action === "register" ? "Criar conta" : "Entrar"}
      </button>

      <p className="text-center text-sm md:text-md">
        {action === "register"
          ? "Já possui uma conta?"
          : "Ainda não possui uma conta?"}{" "}
        <Link
          to={`/${action === "register" ? "login" : "register"}`}
          className="text-blue-600 underline"
        >
          {action === "register" ? "Entre!" : "Se cadastre!"}
        </Link>
      </p>
    </form>
  );
}
