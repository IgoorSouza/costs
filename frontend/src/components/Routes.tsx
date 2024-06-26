import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import NewProject from "../pages/NewProject";
import ProjectDetails from "../pages/ProjectDetails";
import Projects from "../pages/Projects";
import Register from "../pages/Register";
import PageNotFound from "../utils/PageNotFound";
import PrivateRoutes from "../utils/PrivateRoutes";

export default function RoutesComponent() {
  const { authenticating } = useContext(AuthContext);

  return authenticating ? (
    <div className="mt-6 text-center md:mt-10">
      <h1 className="text-2xl md:text-3xl">Autenticando...</h1>
      <p className="mt-1 text-lg md:mt-2 md:text-xl">
        Isso pode levar alguns segundos...
      </p>
    </div>
  ) : (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects" element={<PrivateRoutes />}>
        <Route path="" element={<Projects />} />
        <Route path="new" element={<NewProject />} />
        <Route path=":projectId" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}
