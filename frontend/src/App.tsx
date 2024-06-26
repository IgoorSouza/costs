import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

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
        <Routes />
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
