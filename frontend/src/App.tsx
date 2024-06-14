import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<PrivateRoutes />}>
            <Route path="" element={<Projects />} />
            <Route path="new" element={<NewProject />} />
            <Route path=":id" element={<ProjectDetails />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
