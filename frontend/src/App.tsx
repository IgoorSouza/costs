import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoutesComponent from "./utils/Routes";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{ duration: 3000 }}
      />
      <AuthProvider>
        <Header />
        <RoutesComponent />
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
