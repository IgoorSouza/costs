import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./components/MainPage";
import NewProject from "./components/NewProject";
import Projects from "./components/Projects";
import EditProject from "./components/EditProject";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<NewProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<EditProject />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
